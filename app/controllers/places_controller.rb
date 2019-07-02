class PlacesController < ApplicationController

  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    search_radius = 2 # km
    @addr_name = "Address"

    # first we consider the address typed by the user
    if params[:addr].present?
      @places = Place.near(params[:addr], search_radius).where.not(latitude: nil, longitude: nil) # all are sent, the filter is done in JS
      @addr_coordinates = { addr: Geocoder.search(params[:addr]).first.coordinates }
    # then the browser auto location
    elsif params[:lat].present? && params[:long].present?
      @places = Place.near([params[:lat], params[:long]], search_radius).where.not(latitude: nil, longitude: nil) # all are sent, the filter is done in JS
      @addr_name = Geocoder.search([params[:lat], params[:long]]).first.address
      @addr_coordinates = { addr: [params[:lat], params[:long]] }
    # otherwise, no location
    else
      @places = Place.where.not(latitude: nil, longitude: nil) # all are sent, the filter is done in JS
    end

    @services = Service.all # needed to render the checkboxes

    # create the markers for the places on the request address, the filter will be done by js
    @markers = @places.map do |place|
      {
        lat: place.latitude,
        lng: place.longitude,
        services: place.services.map { |e| e.id }, # send the id of the services of this place
        # to make that work : create a _infowindow partial into views/places !!!
        infoWindow: render_to_string(partial: "infowindow", locals: { place: place })
      }
    end
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

end
