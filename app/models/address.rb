class Address < ApplicationRecord
    has_many :users
    has_many :needs

    # geocoded_by :stringified_address, if: ->(obj){ obj.address.present? and obj.address_changed? } do |obj, res|
    #     if geo = res.first
    #         obj.long_lat = [geo.longitude, geo.latitude]
    #     end
    # end
    # after_validation :geocode
    # # , :if => :address_changed?

    # def stringified_address
    #     [number, street, city, country].compact.join(', ')
    # end
end
