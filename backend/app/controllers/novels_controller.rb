class NovelsController < ApplicationController

    def index
        @novels = Novel.all
        
        render json: @novels
    end

    def show
        @novel = Novel.find params[:id]
        
        respond_to_post
    end

    def create
        @novel = Novel.create novel_params

        respond_to_post
    end
    
    private

    def novel_params
        params.permit(:title, :author, :release_date, :summary, :cover_art)
    end

    def respond_to_post
        if @novel.valid?
            novel_serializer = NovelSerializer.new(novel: @novel)
            render json: novel_serializer.serialize_new_novel

        end
    end

end
