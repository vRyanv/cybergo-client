import {AdminPanelSettingsIcon, ArrowBackIosNewIcon, KeyboardArrowDownIcon, NotificationsNoneTwoToneIcon} from '~/assets/icon'
import avatar from '~/assets/images/thumb.jpg'
import {Scrollbars} from 'react-custom-scrollbars-2';
import NotificationItem from "~/layout/main-admin-layout/components/header/NotificationItem";

export default function Header() {
    const onMenuClicked = (e) => {
        const side_bar = document.getElementsByClassName('sidebar')
        const content = document.getElementsByClassName('content')
        const body_page = document.getElementsByClassName('body-page')

        if (side_bar[0].classList.contains('open')) {
            side_bar[0].classList.remove('open')
            content[0].classList.remove('open')
            if(body_page.length){
                body_page[0].classList.remove('full-width-body-page')
            }

        } else {
            side_bar[0].classList.add('open')
            content[0].classList.add('open')
            if(body_page.length){
                body_page[0].classList.add('full-width-body-page')
            }
        }
    }

    return (
        <nav style={{padding: '1rem!important'}}
             className="navbar navbar-expand navbar-dark sticky-top bg-glass">
            <div className="navbar-brand d-flex d-lg-none me-4" style={{marginLeft: '1.5rem'}}>
                <h2 style={{color: 'white'}} className="mb-0">
                    <AdminPanelSettingsIcon sx={{ color: 'var(--primary)' }} fontSize={'large'}/>
                </h2>
            </div>
            <div onClick={onMenuClicked}
                 style={{backgroundColor: '#ffc58957', color: 'orange', marginLeft: '1rem'}}
                 className="sidebar-toggler flex-shrink-0">
                <ArrowBackIosNewIcon/>
            </div>
            <div className="navbar-nav align-items-center ms-auto" style={{marginRight: '23px'}}>
                <div className="nav-item dropdown">
                    <a href="#" style={{color: 'black'}} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <div className="d-inline-block div-icon-dropdown">
                            <NotificationsNoneTwoToneIcon/>
                        </div>
                        <span className="d-none d-lg-inline-flex" style={{marginLeft: '1rem'}}>Notification</span>
                        <KeyboardArrowDownIcon className="i con-arrow"/>
                    </a>
                    <div
                        className="dropdown-menu dropdown-menu-end border-0 rounded m-0"
                        data-bs-popper="none" style={{width: 'fit-content'}}>
                        <Scrollbars style={{minWidth: '10rem', height: 300}}  autoHide>
                            {
                                Array.from([1,2,3,4]).map((a, index) => <NotificationItem key={index} content={'hello'} from={'khang'}/>)
                            }
                        </Scrollbars>
                    </div>
                </div>
                <a href="" className="nav-item dropdown">
                    <div style={{color: 'black'}} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img className="rounded-circle me-lg-2" src={avatar} alt="avatar"
                             style={{width: '40px', height: '40px'}}/>
                        <span className="d-none d-lg-inline-flex" style={{marginLeft: '1rem'}}>Johsn Doe</span>
                        <KeyboardArrowDownIcon className="icon-arrow"/>
                    </div>
                    <div className="dropdown-menu dropdown-menu-end border-0 rounded m-0">
                        <div className="dropdown-item">My Profile</div>
                        <div className="dropdown-item">Settings</div>
                        <div className="dropdown-item">Log Out</div>
                    </div>
                </a>
            </div>
        </nav>
    )
}