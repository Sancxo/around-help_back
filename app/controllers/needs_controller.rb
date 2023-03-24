class NeedsController < ApplicationController
  before_action :set_need, only: %i[ show update destroy ]

  # GET /needs
  def index
    @needs = Need.all.includes(:address, :creator)

    @needs_with_associated_data = @needs.map do |need|
      need.attributes.merge(
        'address' => need.address, 
        'creator' => need.creator
      )
    end

    render json: @needs_with_associated_data
  end

  # GET /needs/1
  def show
    @need = Need.includes(:address, :creator, :fulfillers).find(params[:id])

    @need_with_associatied_data = @need.attributes.merge(
      'address' => @need.address,
      'creator' => @need.creator,
      'fulfillers' => @need.fulfillers
    )

    render json: @need_with_associatied_data
  end

  # POST /needs
  def create
    @need = Need.new(need_params)

    if @need.save
      render json: {need: @need, message: "Need successfully created!"}, status: :created, location: @need
    else
      render json: @need.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /needs/1
  def update
    if @need.update(need_params)
      render json: {need: @need, message: "Need successfully updated!"}
    else
      render json: @need.errors, status: :unprocessable_entity
    end
  end

  # DELETE /needs/1
  def destroy
    @need.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_need
      @need = Need.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def need_params
      params.require(:need).permit(:title, :description, :is_one_time, :is_fulfilled, :address_id, :creator_id)
    end
end
