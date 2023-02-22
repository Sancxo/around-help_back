class ChatRoom < ApplicationRecord
  belongs_to :need

  has_many :chat_messages
  has_and_belongs_to_many :users
end