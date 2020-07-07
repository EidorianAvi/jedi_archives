class GraphicNovelsController < ApplicationController
    
    def index
        @graphic_novels = GraphicNovel.all
        render json: { graphic_novels: @graphic_novels }
    end

    def show
        @graphic_novel = GraphicNovel.find params[:id]
        render json: { graphic_novel: @graphic_novel }
    end

    def create
        @graphic_novel = GraphicNovel.create(
            title: params[:title],
            author: params[:author],
            cover_art: params[:cover_art],
            release_date: params[:release_date],
            summary: params[:summary]
        )
        render json: { graphic_novel: @graphic_novel }, status: :created
    end


end
