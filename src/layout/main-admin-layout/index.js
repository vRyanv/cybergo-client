import Navigation from './components/Navigation'
import Header from './components/header/Header'

import {ViewLargeImageModal} from '~/components/custom'

export default function MainAdminLayout({children}){
    return (
        <div className="container-fluid position-relative d-flex p-0 admin-body">
            <Navigation/>
            <div className="content">
                <Header/>
                {children}
                <ViewLargeImageModal/>
            </div>
        </div>
    )
}