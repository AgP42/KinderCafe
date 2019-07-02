class PlacesController < ApplicationController

  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    @places = Place.where.not(latitude: nil, longitude: nil) # all are sent, the filter is done in JS
    @services = Service.all # needed to render the checkboxes

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
