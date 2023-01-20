class UsersController < ApplicationController
    before_action :authenticate_user!

    # GET /user
    def this
      this_user = get_user_from_token
      
      render json: {
        message: "You're logged in because of the token!",
        user: this_user,
        avatar: this_user.avatar.attached? ? rails_blob_path(this_user.avatar) : nil
      }
    end

    # GET /user/:id
    def show
      user = User.find(params[:id])
      
      render json: {
        message: "User found!",
        user: user,
        avatar: user.avatar.attached? ? rails_blob_path(user.avatar) : nil
      }
    end

    # PATCH/PUT /user
    def update
      this_user = get_user_from_token

      if this_user.update(user_params)
        render json: {
          message: "User successfully updated!",
          user: this_user,
          avatar: this_user.avatar.attached? ? rails_blob_path(this_user.avatar) : nil
        }
      else
        render json: {
          message: "A problem occured while updating user. Aborted!",
          error: this_user.errors
        }, status: :unprocessable_entity
      end
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

    def user_params
      params.require(:user).permit(:first_name, :last_name, :avatar, :birthdate, :about, :email, :password, :password_confirmation, :current_password, :address_id)
    end
  end