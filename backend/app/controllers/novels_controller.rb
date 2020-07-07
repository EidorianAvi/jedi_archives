class NovelsController < ApplicationController

    def index
        @novels = Novel.all
        render json: { novels: @novels }
    end

    def show
        @novel = Novel.find params[:id]
        render json: { novel: @novel }
    end

    def create
        @novel = Novel.create(
            title: params[:title],
            author: params[:author],
            cover_art: params[:cover_art],
            release_date: params[:release_date],
            summary: params[:summary]
        )
        render json: { novel: @novel }, status: :created
    end

end
