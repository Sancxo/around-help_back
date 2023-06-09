require "test_helper"
require "json-schema"
require "json"

class AddressTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'is valid' do
    address = Address.new(
      address: '130 Test Street, Test City', 
      lat_lng: {lat: 20, lng: 48}
    )
    assert address.valid?
  end

  test 'is invalid without address' do
    address = Address.new(
      lat_lng: {lat: 20, lng: 48}
    )

    refute address.valid?
    assert_not_nil address.errors[:address]
  end

  test 'is invalid without lat_lng' do
    address = Address.new(
      address: '130 Test Street, Test City'
    )

    refute address.valid?
    assert_not_nil address.errors[:lat_lng]
  end
end
