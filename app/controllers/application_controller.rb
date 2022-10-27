class ApplicationController < ActionController::API
    #protect_from_forgery with: :exception, prepend: true

    before_action :config_permitted_params, if: :devise_controller?

    protected

    def config_permitted_params
        devise_parameter_sanitizer.permit(:sign_up) do |u|
            u.permit(:first_name, :last_name, :avatar, :id_card, :birthdate, :about, :email, :password, :password_confirmation, :address_id)
        end
        devise_parameter_sanitizer.permit(:sign_in) do |u|
            u.permit(:email, :password)
        end
        devise_parameter_sanitizer.permit(:account_update) do |u|
            u.permit(:first_name, :last_name, :avatar, :id_card, :birthdate, :about, :email, :password, :password_confirmation, :current_password, :address_id) 
        end
    end
end
