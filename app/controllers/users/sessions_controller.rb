class Users::SessionsController < Devise::SessionsController
    respond_to :json

    private
    def respond_with(_resource, _opts = {})
        if current_user
            render json: {
                message: "You're logged in!",
                user: current_user
            }, status: :ok
        else
            render json: {
                message: "Oops ... Either email or password is invalid!"
            }, status: :unauthorized
        end 
    end

    def respond_to_on_destroy
        log_out_succes && return if current_user

        log_out_failure
    end

    def log_out_succes 
        render json: {message: "You're logged out"}, status: :ok
    end

    def log_out_failure
        render json: {message: "Hmm, nothing happened ..."}, status: :unauthorized
    end
end