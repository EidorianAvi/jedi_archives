class NovelSerializer

    def self.serialize novel
        {
            id: novel.id,
            cover_art: novel.get_image_url,
            title: novel.title,
            author: novel.author,
            release_date: novel.release_date,
            summary: novel.summary
        }
    end

end