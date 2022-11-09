class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist 

  belongs_to :address, optional: true
  has_many :user_need

  has_one_attached :id_card
  has_one_attached :avatar

  validates :id_card, attached: true, content_type: {in: ['application/pdf', 'image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif'], message: "Not a supported image format. Should be either .pdf, .png, .jpeg, .gif, .webp or .avif"}
  validates :avatar, content_type: {in: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif'], message: "Not a supported image format. Should be either .png, .jpeg, .gif, .webp or .avif"}
end
