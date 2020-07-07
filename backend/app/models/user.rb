class User < ApplicationRecord
    has_secure_password
    has_many :graphic_novel_collections
    has_many :graphic_novels, through: :graphic_novel_collections
    has_many :novel_collections
    has_many :novels, through: :novel_collections
end
