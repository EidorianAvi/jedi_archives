class NovelSerializer

    def initialize(novel: nil)
        @novel = novel
    end

    def serialize_new_novel
        serialized_new_novel = serialize_novel(@novel)
        serialized_new_novel.to_json
    end

    private

    def serialize_novel novel
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