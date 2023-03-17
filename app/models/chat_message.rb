class ChatMessage < ApplicationRecord
  after_create_commit {broadcast_message}

  belongs_to :user
  belongs_to :chat_room

  private

  def broadcast_message
    ActionCable.server.broadcast("room_#{chat_room_id}_channel", {id:, body:})
  end
end