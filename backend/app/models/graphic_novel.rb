class GraphicNovel < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_many :graphic_novel_collections
    has_many :users, through: :graphic_novel_collections

    has_one_attached :cover_art
    
    validates :title, :author, :release_date, :summary, presence: true
    validates :cover_art, {
        presence: true
    }


    def get_image_url
        url_for(self.cover_art)
    end
end
