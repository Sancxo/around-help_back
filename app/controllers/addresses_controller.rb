class AddressesController < ApplicationController
  require "json-schema"
  require "json"
  before_action :set_address, only: %i[ show update destroy ]

  # GET /addresses
  def index
    @addresses = Address.all

    render json: @addresses
  end

  # GET /addresses/1
  def show
    render json: @address
  end

  # POST /addresses
  def create
    @address = Address.new(params.permit(:address, lat_lng: [:lat, :lng]))

    json_validation = JSON::Validator.validate("#{Rails.root}/app/models/address_schema.json", @address.lat_lng)
    
    if json_validation
      puts "[AddressesController] -- `lat_lng` JSON argument validated well with #{@address.lat_lng.inspect()}."
    else 
      puts "[ERROR in AddressesController] -- `lat_lng` JSON argument has errors : #{@address.lat_lng.inspect()}."
    end

    if json_validation && @address.save
      render json: {
        address: @address, 
        message: "Address succesfully created!"
      }, status: :created, location: @address
    else
      render json: {
        message: "An error occured while registrating address!", 
        error: @address.errors
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /addresses/1
  def update
    if @address.update(address_params)
      render json: {address: @address, message: "Address successfully updated!"}
    else
      render json: @address.errors, status: :unprocessable_entity
    end
  end

  # DELETE /addresses/1
  def destroy
    @address.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_address
      @address = Address.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def address_params
      params.require(:address).permit(:address, :lat_lng)
    end
end
