class GraphicNovel < ApplicationRecord
    has_many :graphic_novel_collections
    has_many :users, through: :graphic_novel_collections
end
