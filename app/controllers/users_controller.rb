class UsersController < ApplicationController
    before_action :authenticate_user!

    def this
      user = get_user_from_token
      render json: {
        message: "You're logged in because of the token!",
        user: user
      }
    end

    def show
      user = User.find(params[:id])
      puts "User #{user.inspect()} !!!!!!!!!!"
      render json: {
        message: "User found!",
        user: user
      }
    end

    private 
    def get_user_from_token
        jwt_payload = JWT.decode(
            request.headers['Authorization'].split(' ')[1], 
            Rails.application.credentials.devise[:jwt_secret_key]
        ).first
        user_id = jwt_payload['sub']
        user = User.find(user_id.to_s)
    end
  end