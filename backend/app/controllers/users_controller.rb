class UsersController < ApplicationController

    def index
        @users = User.all 
        render json: { users: @users}
    end

    def show
        @user = User.find params[:id]
        render json: { user: @user }
    end

    def create
     @user = User.new(user_params)
        if @user.valid?
            @user.save
            render json: { user: @user }, status: :created
        else
            render json: { message: @user.errors.messages }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end

end


