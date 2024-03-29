class ChatRoomUsersController < ApplicationController
  before_action :set_chat_room_user, only: %i[ show update destroy ]

  # GET /chat_room_users
  def index
    @chat_room_users = ChatRoomUser.all

    render json: @chat_room_users
  end

  # GET /chat_room_users/1
  def show
    render json: @chat_room_user
  end

  # POST /chat_room_users
  def create
    @chat_room = ChatRoom.find(params[:chat_room_id])
    @user = User.includes(:chat_rooms).find(params[:user_id])

    @updated_user = @user.chat_rooms << @chat_room

    if @updated_user
      render json: 
        @user.attributes.merge('chat_rooms' => current_user.chat_rooms.map do |chat_room| 
          chat_room.id 
        end), status: :created
    else
      render json: @updated_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chat_room_users/1
  def update
    if @chat_room_user.update(chat_room_user_params)
      render json: @chat_room_user
    else
      render json: @chat_room_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chat_room_users/1
  def destroy
    @chat_room_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat_room_user
      @chat_room_user = ChatRoomUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_room_user_params
      params.fetch(:chat_room_user, {}).permit(:chat_room_id, :user_id)
    end
end
