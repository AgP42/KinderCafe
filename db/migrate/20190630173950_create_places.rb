class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :image1
      t.string :image2
      t.string :image3
      t.string :image4
      t.string :gmap_link
      t.text :comment
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
