import NotFoundLayout from "~/layout/not-found-layout";
import UnauthorizedPage from "~/page/common/unauthorized-page";
import {UseLocalStorage} from '~/hooks'

import {Http} from '~/constants'

const PrivateRoute = ({children}) => {
    const [getLocal, saveLocal] = UseLocalStorage()
    const token = getLocal(Http.USER_TOKEN)
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