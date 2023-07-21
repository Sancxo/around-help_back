class AlterNeedsToAddFulfillmentTimestamp < ActiveRecord::Migration[7.0]
  def change
    add_column :needs, :fulfillment_timestamp, :timestamp, null: true, default: nil
  end
end
