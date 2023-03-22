module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # Connection ...
    end

    def receive(data)
      parsed_data = ActiveSupport::JSON.decode(data)

      parsed_message = ActiveSupport::JSON.decode(parsed_data["identifier"])

      chat_room_id = parsed_message["room_id"]

      self.current_user = find_verified_user(chat_room_id)

      send_async :dispatch_websocket_message, data
    end

    private
    
    def find_verified_user(chat_room_id)
      jwt_payload = JWT.decode(
        cookies.signed[:jwt], 
        Rails.application.credentials.devise[:jwt_secret_key]
      ).first

      verified_user = User.includes(:chat_rooms).find_by(id: jwt_payload['id'])
      chat_room = ChatRoom.find(chat_room_id)

      if verified_user && verified_user.chat_rooms.include?(chat_room)
        verified_user
      else 
        reject_unauthorized_connection
      end
    end
  end
end
