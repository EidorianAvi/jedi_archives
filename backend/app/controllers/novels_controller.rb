class NovelsController < ApplicationController

    def index
        @novels = Novel.all
        
        serialized_novels = @novels.map do |novel|
            NovelSerializer.serialize(novel)
        end
        # byebug
        render json: serialized_novels
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
            render json: NovelSerializer.serialize(@novel)
        end
    end

end
