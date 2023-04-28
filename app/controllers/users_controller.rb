class UsersController < ApplicationController
  # GET /user
  def this
    render json: {
      message: "You're logged in because of the token!",
      user: current_user.attributes.merge('chat_rooms' => current_user.chat_rooms.map do |chat_room| chat_room.id end),
      avatar: current_user.avatar.attached? ? rails_blob_path(current_user.avatar) : nil
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
    if current_user.update(user_params)
      render json: {
        message: "User successfully updated!",
        user: current_user,
        avatar: current_user.avatar.attached? ? rails_blob_path(current_user.avatar) : nil
      }
    else
      render json: {
        message: "A problem occured while updating user. Aborted!",
        error: current_user.errors
      }, status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(:first_name, :last_name, :avatar, :birthdate, :about, :email, :password, :password_confirmation, :current_password, :address_id)
  end
end