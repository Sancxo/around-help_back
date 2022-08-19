class UserNeed < ApplicationRecord
  belongs_to :user
  belongs_to :need
end
