class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :places

  validates :name, uniqueness: true, presence: true
  validates :email, uniqueness: true, presence: true

  mount_uploader :picture, PhotoUploader

end