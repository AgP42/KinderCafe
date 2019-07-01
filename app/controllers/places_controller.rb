class PlacesController < ApplicationController

  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    #### to display the markers on the map for thoses with address
    @match_places = Place.where.not(latitude: nil, longitude: nil)

    @markers = @match_places.map do |place|
      {
        lat: place.latitude,
        lng: place.longitude,
        # to make that work : create a _infowindow partial into views/places !!!
        infoWindow: render_to_string(partial: "infowindow", locals: { place: place })
      }
    end
    ### end markers
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
