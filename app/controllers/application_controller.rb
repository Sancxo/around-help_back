class ApplicationController < ActionController::API
    #protect_from_forgery with: :exception, prepend: true

    before_action :config_permitted_params, if: :devise_controller?

    protected

    def config_permitted_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :avatar, :id_card, :birthdate, :about, :email, :password, :password_confirmation, :address_id])

        devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
    end

end
