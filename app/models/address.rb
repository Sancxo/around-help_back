class Address < ApplicationRecord
    has_many :users
    has_many :needs

    validates :address, presence: true
    validates :lat_lng, presence: true
end
