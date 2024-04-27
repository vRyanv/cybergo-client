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
    }
}

export default paths



