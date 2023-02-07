class CreateNeedsUsers < ActiveRecord::Migration[7.0]
  def change
    drop_table :user_needs, if_exists: true, force: true 

    create_table :needs_users, id: false do |t|
      t.belongs_to :need
      t.belongs_to :user
      t.timestamps
    end
  end
end
