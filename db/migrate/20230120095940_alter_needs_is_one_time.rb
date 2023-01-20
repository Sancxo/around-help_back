class AlterNeedsIsOneTime < ActiveRecord::Migration[7.0]
  def change
    change_table :needs do |t|
      t.rename :is_one_time?, :is_one_time
      t.rename :is_fulfilled?, :is_fulfilled
      t.change_null :address_id, true
    end
  end
end
