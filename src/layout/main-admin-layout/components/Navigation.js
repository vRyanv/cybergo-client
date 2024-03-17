import {
    DashboardTwoToneIcon,
    TwoWheelerIcon,
    QuestionAnswerTwoToneIcon,
    ManageAccountsTwoToneIcon,
    PeopleAltTwoToneIcon} from '~/assets/icon'
import {NavLink, useLocation} from "react-router-dom";
import React from "react";
import front from '~/assets/css/font.module.css'

export default function Navigation(){
    const onNavClicked = (e) =>{
        const navs = document.getElementsByClassName('nav-item')
        Array.from(navs).forEach(nav => {
            nav.classList.remove('active');
        });

        e.target.classList.add('active')
    }
    const location = useLocation();
    return (
        <div className="sidebar pe-4 pb-3 p-3 mb-5 bg-body-tertiary bg-glass">
            <nav className="navbar navbar-dark">
                <div className="navbar-brand mx-4 mb-3">
                    <h3 className={front.f_heavy} style={{color: 'var(--primary)'}}>CYBER GO
                    </h3>
                </div>
                <div className="navbar-nav w-100">
                    <NavLink
                        to={'/dashboard'}
                        className={`nav-item nav-link ${location.pathname.includes('/dashboard') ? 'active' : '' }`}
                        onClick={onNavClicked}>
                        <DashboardTwoToneIcon style={{marginRight: '1rem'}}/>
                        Dashboard
                    </NavLink >
                    <NavLink   to={'/driver-registration'}
                               className={`nav-item nav-link ${location.pathname.includes('/driver') ? 'active' : '' }`}
                               onClick={onNavClicked}>
                        <TwoWheelerIcon style={{marginRight: '1rem'}}/>
                        Driver
                    </NavLink >
                    <NavLink
                        to={'/feedback'}
                        className={`nav-item nav-link ${location.pathname.includes('/feedback') ? 'active' : '' }`}
                        onClick={onNavClicked}>
                        <QuestionAnswerTwoToneIcon style={{marginRight: '1rem'}}/>
                        Feedback
                    </NavLink >
                    <NavLink
                        to={'/account'}
                        className={`nav-item nav-link ${location.pathname.includes('/account') ? 'active' : '' }`}
                        onClick={onNavClicked}>
                        <PeopleAltTwoToneIcon style={{marginRight: '1rem'}}/>
                        Account
                    </NavLink >
                    <NavLink
                        to={'/profile'}
                        className={`nav-item nav-link ${location.pathname.includes('/profile') ? 'active' : '' }`}
                        onClick={onNavClicked}>
                        <ManageAccountsTwoToneIcon style={{marginRight: '1rem'}}/>
                        Profile
                    </NavLink >
                </div>
            </nav>
        </div>
    )
}