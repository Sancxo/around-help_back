class ApplicationController < ActionController::API
    #protect_from_forgery with: :exception, prepend: true
    respond_to :json
    before_action :get_user_from_token
    before_action :config_permitted_params, if: :devise_controller?

    include ::ActionController::Cookies

    private 

    def get_user_from_token
        if cookies.signed[:jwt] 
          begin
            jwt_payload = JWT.decode(
              cookies.signed[:jwt], 
              Rails.application.credentials.devise[:jwt_secret_key]
            ).first

            @current_user_id = jwt_payload['id']

          rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
            head :unauthorized
          end
        end
    end

    def authenticate_user!(opts = {})
        head :unauthorized unless signed_in?
    end

    def signed_in?
        @current_user_id.present?
    end

    def current_user
      get_user_from_token

      @current_user ||= super || User.includes(:chat_rooms).find(@current_user_id)
    end

    def set_jwt_cookie(token)
        cookies.signed[:jwt] = {value: token, httponly: true, same_site: :none, secure: true, expires: 1.hour.from_now}
    end

    protected

    def config_permitted_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :avatar, :id_card, :birthdate, :about, :email, :password, :password_confirmation, :address_id])

        devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
    end

end
