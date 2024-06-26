const paths = {
    public_path: {
        SIGN_IN_PATH: '/sign-in',
        SIGN_UP_PATH: '/sign-up',
        HOME_PATH: '/',
        NOT_FOUND_PATH: '*'
    },
    private_path: {
        DRIVER_REGISTRATION_PATH: '/driver-registration',
        DRIVER_REGISTRATION_DETAIL_PATH: '/driver-registration/detail/:vehicle_id',
        DASHBOARD_PATH: '/dashboard',
        USER_PATH: '/user',
        USER_DETAIL_PATH: '/user/detail/:user_id',
        VEHICLE_DETAIL_PATH: '/vehicle-detail/:vehicle_id',
        ENABLE_F2A_PATH: '/enable-2fa',
        VERIFY_F2A_PATH: '/verify-2fa/:email',
    }
}

export default paths



