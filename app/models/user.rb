class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :speech_results, :dependent => :destroy

  def move_to(user)
   user.speech_results.update_all(user_id: user.id)
   user.update_attributes(guest: nil)
  end

end
