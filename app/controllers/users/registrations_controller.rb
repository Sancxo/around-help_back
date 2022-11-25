class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json

    private
    def respond_with(resource, _opts = {})
        register_success && return if resource.persisted?

        register_failed
    end

    def register_success
        render json: {
            message: "Signed up successfully!",
            user: current_user,
            avatar: rails_blob_path(current_user.avatar)
        }, status: :ok
    end

    def register_failed
        render json: {
            message: "Oops! Something went wrong ..."
        }, status: :unprocessable_entity
    end
end