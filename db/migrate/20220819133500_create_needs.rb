class CreateNeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :needs do |t|
      t.string :title
      t.text :description
      t.boolean :is_one_time?, null: false, default: true
      t.boolean :is_fulfilled?, null: false, default: false
      t.references :address, null: false, foreign_key: true

      t.timestamps
    end
  end
end
