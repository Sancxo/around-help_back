class Users::SessionsController < Devise::SessionsController
    def create
        user = User.find_by_email(sign_in_params[:email]) 

        respond_with(user, sign_in_params)
    end

    private
    def respond_with(user, opts = {})
        if  user && user.valid_password?(opts[:password])
            log_in_success user
        else
           log_in_failure
        end 
    end

    def log_in_success(user)
        token = user.generate_token
        set_jwt_cookie(token)

        render json: {
            message: "You're logged in!",
            user: user,
            avatar: user.avatar.attached? ? rails_blob_path(user.avatar) : nil
        }, status: :ok
    end

    def log_in_failure
        render json: {
            message: "Oops ... Either email or password is invalid!"
        }, status: :unauthorized
    end

    def respond_to_on_destroy
        log_out_succes && return if current_user

        log_out_failure
    end

    def log_out_succes 
        cookies.delete(:jwt)
        render json: {message: "You're logged out"}, status: :ok
    end

    def log_out_failure
        render json: {message: "Hmm, nothing happened ..."}, status: :unauthorized
    end
end