class User::RegistrationsController < Devise::RegistrationsController
  before_action :configure_account_update_params, only: [:update]

    # GET /resource/sign_up
    def new
      super
    end

    # POST /resource
    def create
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
