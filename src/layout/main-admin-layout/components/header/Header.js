import {AdminPanelSettingsIcon, ArrowBackIosNewIcon, KeyboardArrowDownIcon, NotificationsNoneTwoToneIcon} from '~/assets/icon'
import avatar_admin from '~/assets/images/avatar/admin_avatar.jpg'
import {Scrollbars} from 'react-custom-scrollbars-2';
import NotificationItem from "~/layout/main-admin-layout/components/header/NotificationItem";
import avatar_notify from '~/assets/images/avatar/truc.jpg'
import {useState} from "react";
import ProfileDialog from "./ProfileDialog";
export default function Header() {
    const [is_open_profile_dialog, setIsOpenProfileDialog] = useState(false)

    const onCloseProfileDialog = () => {
        setIsOpenProfileDialog(false)
    }
    const onProfileClicked = () => {
        setIsOpenProfileDialog(true)
    }

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
                        data-bs-popper="none" style={{minWidth: '17rem'}}>
                        <Scrollbars style={{minWidth: '10rem', height: 300}}  autoHide>
                            {
                                Array.from([1]).map((a, index) => <NotificationItem key={index} avatar={avatar_notify} content={'vehicle registration'} from={'Le Truc'}/>)
                            }
                        </Scrollbars>
                    </div>
                </div>
                <a href="#" className="nav-item dropdown">
                    <div style={{color: 'black'}} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img className="rounded-circle me-lg-2" src={avatar_admin} alt="avatar"
                             style={{width: '40px', height: '40px'}}/>
                        <span className="d-none d-lg-inline-flex" style={{marginLeft: '1rem'}}>Admin</span>
                        <KeyboardArrowDownIcon className="icon-arrow"/>
                    </div>
                    <div className="dropdown-menu dropdown-menu-end border-0 rounded m-0">
                        <div className="dropdown-item" onClick={onProfileClicked}>Profile</div>
                        <div className="dropdown-item">Log Out</div>
                    </div>
                </a>
            </div>
            <ProfileDialog is_open={is_open_profile_dialog} onClose={onCloseProfileDialog}/>
        </nav>
    )
}