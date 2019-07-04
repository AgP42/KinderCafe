class UsersController < ApplicationController

  def index
    @user = current_user
    # @user_places = @user.places
  end

  def edit
  end

  def update
  end

end
