class Users::RegistrationsController < Devise::RegistrationsController
    def create
        user = User.includes(:chat_rooms).new(sign_up_params)
        user.save
        respond_with user
    end

    private
    def respond_with(user, _opts = {})
        register_success(user) && return if user.persisted?

        register_failed
    end

    def register_success(user)
        token = user.generate_token
        set_jwt_cookie(token)

        render json: {
            message: "Signed up successfully!",
            user: user.attributes.merge('chat_rooms' => user.chat_rooms.map do |chat_room| chat_room.id end),
            avatar: user.avatar.attached? ? rails_blob_path(user.avatar) : nil
        }, status: :ok
    end

    def register_failed
        render json: {
            message: "Oops! Something went wrong ..."
        }, status: :unprocessable_entity
    end
end