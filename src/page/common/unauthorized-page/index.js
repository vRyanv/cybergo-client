import * as React from 'react';
import clsx from "clsx";

import thumb_unauthorized from '~/assets/images/thumb-unauthorized.svg'
import style from '~/page/common/not-found-page/not-found-page.module.css'
import font from '~/assets/css/font.module.css'
import PrimaryButton from "~/components/custom/button/PrimaryButton";
import AppStyle from '~/App.module.css'
import {Link} from "react-router-dom";


export default function UnauthorizedPage() {
    return (<div className={style.container}>
        <p className={clsx(AppStyle.cl_danger, font.f_heavy)} style={{fontSize:'2rem'}}>Unauthorized!</p>
        <img src={thumb_unauthorized} alt="thumb_not_found" style={{marginTop: '2rem', minHeight: '26rem'}}/>
        <Link to={'/sign-in'}>
        <PrimaryButton
            text="LOGIN"
            style={{
                marginTop: '2rem',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}/>
        </Link>
    </div>)
}