class Novel < ApplicationRecord
    has_many :novel_collections
    has_many :users, through: :novel_collections
end
