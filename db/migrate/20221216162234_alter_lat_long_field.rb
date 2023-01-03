class AlterLatLongField < ActiveRecord::Migration[7.0]
  def change
    remove_columns :addresses, :long_lat, array: true, default: []
    add_column :addresses, :lat_lng, :jsonb, null: false, default: '{lat: 0, lng: 0}'
  end
end
