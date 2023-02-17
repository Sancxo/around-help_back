class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room_#{params[:room_id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def get_user_data
    user = {
      id: current_user.id,
      first_name: current_user.first_name,
      last_name: current_user.last_name
    }

    ActionCable.server.broadcast "room_#{params[:room_id]}_channel", {data: user}
  end
end
