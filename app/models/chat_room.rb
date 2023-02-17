class ChatRoom < ApplicationRecord
  belongs_to :need

  has_many :chat_messages
end