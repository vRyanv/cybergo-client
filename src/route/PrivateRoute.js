import NotFoundLayout from "~/layout/not-found-layout";
import UnauthorizedPage from "~/page/common/unauthorized-page";

import {UserTokenContext}  from '~/context/UserTokenContext'
import {useContext} from "react";

const PrivateRoute = ({children}) => {
    const [token, setUserToken] = useContext(UserTokenContext)
    if (!token) {
        return (
            <NotFoundLayout>
                <UnauthorizedPage/>
            </NotFoundLayout>
        )
    }
    return children;
}


export default PrivateRoute