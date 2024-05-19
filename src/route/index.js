import {Route, Routes} from "react-router-dom";

import {MainAdminLayout, MainClientLayout, NotFoundLayout, SignInLayout} from "~/layout";
import {EnableF2APage, NotFoundPage, SignInPage, VerifyF2APage} from "~/page/common";
import {
    DashboardPage,
    DriverRegistrationDetailPage,
    DriverRegistrationPage,
    UserDetailPage,
    UserListPage,
    VehicleDetailPage,
} from "~/page/admin";
import {HomePage} from "~/page/client";
import PrivateRoute from './PrivateRoute'
import {Paths} from "~/constants";

const public_route = [
    {path: Paths.public_path.SIGN_IN_PATH, page: SignInPage, layout: SignInLayout},
    {path: Paths.public_path.NOT_FOUND_PATH, page: NotFoundPage, layout: NotFoundLayout},
    {path: Paths.public_path.HOME_PATH, page: HomePage, layout: MainClientLayout},
    {path: Paths.private_path.VERIFY_F2A_PATH, page: VerifyF2APage, layout: MainClientLayout},
]

const private_route = [
    {path: Paths.private_path.DRIVER_REGISTRATION_PATH, page: DriverRegistrationPage, layout: MainAdminLayout},
    {path: Paths.private_path.DRIVER_REGISTRATION_DETAIL_PATH, page: DriverRegistrationDetailPage, layout: MainAdminLayout},
    {path: Paths.private_path.DASHBOARD_PATH, page: DashboardPage, layout: MainAdminLayout},
    {path: Paths.private_path.USER_PATH, page: UserListPage, layout: MainAdminLayout},
    {path: Paths.private_path.USER_DETAIL_PATH, page: UserDetailPage, layout: MainAdminLayout},
    {path: Paths.private_path.VEHICLE_DETAIL_PATH, page: VehicleDetailPage, layout: MainAdminLayout},
    {path: Paths.private_path.ENABLE_F2A_PATH, page: EnableF2APage, layout: MainAdminLayout},
]

function GeneratePublicRoute(route_list) {
    return route_list.map((route, index) => {
        const Layout = route.layout
        const Page = route.page
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        <Page/>
                    </Layout>
                }
            />
        )
    })
}

function GeneratePrivateRoute(route_list) {
    return route_list.map((route, index) => {
        const Layout = route.layout
        const Page = route.page
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <PrivateRoute>
                        <Layout>
                            <Page/>
                        </Layout>
                    </PrivateRoute>
                }
            />
        )
    })
}


export default function CyberGoRouter() {
    return (
        <Routes>
            {GeneratePublicRoute(public_route)}
            {GeneratePrivateRoute(private_route)}
        </Routes>
    )
}