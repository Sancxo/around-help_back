class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def create
        user = User.new(sign_up_params)
        user.save
        respond_with user
    end

    private
    def respond_with(resource, _opts = {})
        register_success && return if resource.persisted?

        register_failed
    end

    def register_success
        token = user.generate_token
        set_jwt_cookie(token)

        render json: {
            message: "Signed up successfully!",
            user: user,
            avatar: user.avatar.attached? ? rails_blob_path(user.avatar) : nil
        }, status: :ok
    end

    def register_failed
        render json: {
            message: "Oops! Something went wrong ..."
        }, status: :unprocessable_entity
    end
end