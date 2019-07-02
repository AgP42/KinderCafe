class PlaceService < ApplicationRecord
  belongs_to :place
  belongs_to :service

  # todo : add validation uniqueness paire service/place
end
