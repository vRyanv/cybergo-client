import Navigation from './components/Navigation'
import Header from './components/header/Header'

export default function MainAdminLayout({children}){
    return (
        <div className="container-fluid position-relative d-flex p-0 admin-body">
            <Navigation/>
            <div className="content">
                <Header/>
                {children}
            </div>
        </div>
    )
}