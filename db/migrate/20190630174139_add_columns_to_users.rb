class AddColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :user_name, :string
    add_column :users, :picture, :string
    add_column :users, :is_admin, :boolean
  end
end
