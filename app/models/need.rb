class Need < ApplicationRecord
  belongs_to :address, optional: true

  belongs_to :creator, :class_name => "User"
  has_and_belongs_to_many :fulfillers, :class_name => "User"

  has_many :chat_rooms
end
