class NeedUsersController < ApplicationController
  before_action :set_need_user, only: %i[ show update destroy ]

  # GET /need_users
  def index
    @need_users = NeedUser.all

    render json: @need_users
  end

  # GET /need_users/1
  def show
    render json: @need_user
  end

  # POST /need_users
  def create
    @need = Need.find(params[:need_id])
    @user = User.find(params[:user_id])
    
    @need_user = @need.fulfillers << @user

    @need.update({"is_fulfilled" => true}) if @need.fulfillers.count == 5

    if @need_user
      render json: @need_user, status: :created
    else
      render json: @need_user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /need_users/1
  def update
    if @need_user.update(need_user_params)
      render json: @need_user
    else
      render json: @need_user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /need_users/1
  def destroy
    @need_user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_need_user
      @need_user = NeedUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def need_user_params
      params.fetch(:need_user, {}).permit(:need_id, :user_id)
    end
end
