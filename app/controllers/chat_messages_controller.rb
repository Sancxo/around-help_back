class ChatMessagesController < ApplicationController
  before_action :set_chat_message, only: %i[ show update destroy ]

  # GET /chat_messages
  def index
    @chat_messages = ChatMessage.all

    render json: @chat_messages
  end

  # GET /chat_messages/:chat_room_id
  def get_chat_messages_by_chat_room_id
    @chat_messages = ChatMessage.includes(:user).joins(:chat_room).where('chat_room.id' => params['chat_room_id'])

    @chat_messages_with_preload = @chat_messages.map do |message|
      message.attributes.merge(
        "user" => message.user
      )
    end
    render json: @chat_messages_with_preload
  end

  # GET /chat_messages/1
  def show
    render json: @chat_message
  end

  # POST /chat_messages
  def create
    @chat_message = ChatMessage.new(chat_message_params)

    if @chat_message.save
      render json: @chat_message, status: :created, location: @chat_message
    else
      render json: @chat_message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chat_messages/1
  def update
    if @chat_message.update(chat_message_params)
      render json: @chat_message
    else
      render json: @chat_message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chat_messages/1
  def destroy
    @chat_message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat_message
      @chat_message = ChatMessage.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_message_params
      params.fetch(:chat_message, {}).permit(:body, :user_id, :chat_room_id)
    end
end
