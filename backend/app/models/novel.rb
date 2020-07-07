class Novel < ApplicationRecord
    has_many :novel_collections
    has_many :users, through: :novel_collections
    validates :title, :author, :release_date, :cover_art, :summary, presence: true
    
    has_one_attached :cover_art

    def get_image_url
        url_for(self.cover_art)
    end
end
