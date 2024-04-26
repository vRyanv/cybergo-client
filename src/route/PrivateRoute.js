import NotFoundLayout from "~/layout/not-found-layout";
import UnauthorizedPage from "~/page/common/unauthorized-page";
import {UseLocalStorage} from '~/hooks'

import {Http, Role} from '~/constants'

const PrivateRoute = ({children}) => {
    const [getLocal, saveLocal] = UseLocalStorage()
    const token = getLocal(Http.USER_TOKEN)
    const role = getLocal(Http.ROLE)
    if (!token || role !== Role.ADMIN) {
        return (
            <NotFoundLayout>
                <UnauthorizedPage/>
            </NotFoundLayout>
        )
    }
    return children;
}


export default PrivateRoute