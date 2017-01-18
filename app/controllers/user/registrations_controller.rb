class User::RegistrationsController < Devise::RegistrationsController
  before_action :configure_account_update_params, only: [:update]

    # GET /resource/sign_up
    def new
      super
    end

    # POST /resource
    def create
      @user = current_user
      @user.update_attributes(sign_up_params)
      if @user.save
        current_user.move_to(@user)
        session[:user_id] = @user.id
        session[:guest_user_id] = nil
        redirect_to root_url
      end
      super
    end

    # GET /resource/edit
    def edit
      super
    end

    # PUT /resource
    def update
      super
    end

    protected

    def sign_up_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end

    def configure_account_update_params
      devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :birthday])
    end

end
