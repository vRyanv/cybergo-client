import {Route, Routes} from "react-router-dom";

import {SignInLayout, NotFoundLayout, MainClientLayout, MainAdminLayout} from "~/layout";
import {SignInPage, NotFoundPage} from "~/page/common";
import {AccountPage, DashboardPage, DriverPage} from "~/page/admin";
import {HomePage} from "~/page/client";
import PrivateRoute from './PrivateRoute'
import {Paths} from "~/constants";

const public_route = [
    {path: Paths.public_path.SIGN_IN_PATH, page: SignInPage, layout: SignInLayout},
    {path: Paths.public_path.NOT_FOUND_PATH, page: NotFoundPage, layout: NotFoundLayout},
    {path: Paths.public_path.HOME_PATH, page: HomePage, layout: MainClientLayout}
]

const private_route = [
    {path: Paths.private_path.DRIVER_PATH, page: DriverPage, layout: MainAdminLayout},
    {path: Paths.private_path.DASHBOARD_PATH, page: DashboardPage, layout: MainAdminLayout},
    {path: Paths.private_path.ACCOUNT_PATH, page: AccountPage, layout: MainAdminLayout}
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