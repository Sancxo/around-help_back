class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 

  belongs_to :address, optional: true

  has_many :chat_messages
  has_and_belongs_to_many :chat_rooms

  has_many :needs
  has_and_belongs_to_many :needs

  has_one_attached :id_card
  has_one_attached :avatar


  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true, on: :create
  validates :password_confirmation, presence: true, on: :create

  validates :id_card, attached: true, content_type: {in: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif'], message: "Not a supported image format. Should be either .png, .jpeg, .gif, .webp or .avif"}
  validates :avatar, content_type: {in: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif'], message: "Not a supported image format. Should be either .png, .jpeg, .gif, .webp or .avif"}

  def generate_token
    JWT.encode({id: id, exp: 60.days.from_now.to_i}, Rails.application.credentials.devise[:jwt_secret_key])
  end
end
