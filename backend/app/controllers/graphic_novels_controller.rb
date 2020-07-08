class GraphicNovelsController < ApplicationController
    
    def index
        @graphic_novels = GraphicNovel.all
        
        serialized_graphic_novels = @graphic_novels.map do |graphic_novel|
            NovelSerializer.serialize(graphic_novel)
        end
        # byebug
        render json: serialized_graphic_novels
    end

    def show
        @graphic_novel = GraphicNovel.find params[:id]
        
        respond_to_post
    end

    def create
        @graphic_novel = GraphicNovel.create graphic_novel_params

        respond_to_post
    end
    
    private

    def graphic_novel_params
        params.permit(:title, :author, :release_date, :summary, :cover_art)
    end

    def respond_to_post
        if @graphic_novel.valid?
            render json: NovelSerializer.serialize(@graphic_novel)
        end
    end

end
