class Need < ApplicationRecord
  belongs_to :address, optional: true
  has_many :user_need
end
