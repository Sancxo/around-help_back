class CreateUserNeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :user_needs do |t|
      t.references :user, null: false, foreign_key: true
      t.references :need, null: false, foreign_key: true

      t.timestamps
    end
  end
end
