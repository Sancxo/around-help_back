class Need < ApplicationRecord
  belongs_to :address
  has_many :user_need
end
