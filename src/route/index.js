import {Route, Routes} from "react-router-dom";

import {
    DASHBOARD_PATH,
    DRIVER_REGISTER_PATH, HOME_PATH,
    NOT_FOUND_PATH,
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    USER_MANAGEMENT_PATH
} from "../constants/paths";

import SignInLayout from "../layout/sign-in-layout";
import SignInPage from "../page/common/sign-in-page";
import SignUpPage from "../page/common/sign-up-page";
import NotFoundPage from "../page/common/not-found-page";
import NotFoundLayout from "../layout/not-found-layout";
import UserManagementPage from "../page/admin/user-management-page";
import DashboardPage from "../page/admin/dashboard-page";
import DriverRegisterPage from "../page/admin/driver-register-page";
import HomePage from "../page/client/home-page";
import MainClientLayout from "../layout/main-client-layout";


const public_route = [
    {path: SIGN_IN_PATH, page: SignInPage, layout: SignInLayout},
    {path: SIGN_UP_PATH, page: SignUpPage, layout: SignInLayout},
    {path: NOT_FOUND_PATH, page:NotFoundPage, layout: NotFoundLayout},
    {path: HOME_PATH, page:HomePage, layout: MainClientLayout}
]

const private_route = [
    {path: DRIVER_REGISTER_PATH, page: DriverRegisterPage},
    {path: DASHBOARD_PATH, page: DashboardPage},
    {path: USER_MANAGEMENT_PATH, page:UserManagementPage}
]

function GenerateRoute(route_list){
    return route_list.map(route => {
        const Layout = route.layout
        const Page = route.page
        return (
            <Route
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

export default function CyberGoRouter() {
    return (
        <Routes>
            {GenerateRoute(public_route)}
            {GenerateRoute(private_route)}
        </Routes>
    )
}