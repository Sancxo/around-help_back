class AlterAddress < ActiveRecord::Migration[7.0]
  def change
    remove_columns :addresses, :number, :street, :city, :state, :postal_code, :country
    add_column :addresses, :address, :string, null: false, default: ""
  end
end
