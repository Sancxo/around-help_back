class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :number
      t.string :street
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.decimal :long_lat, array: true, default: []

      t.timestamps
    end
  end
end
