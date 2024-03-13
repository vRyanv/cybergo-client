import * as React from 'react';
import clsx from "clsx";

import thumb_not_found from '../../../assets/images/thumb-not-found.svg'
import style from './not-found-page.module.css'
import font from '../../../assets/css/font.module.css'
import PrimaryButton from "../../../components/custom/button/PrimaryButton";
import AppStyle from '../../../App.module.css'


export default function NotFoundPage() {

    const handleGoBack = ()=>{
        window.history.back()
    }

    return (<div className={style.container}>
        <p className={AppStyle.cl_danger}>Looks Like You Got Lost</p>
        <p className={clsx(AppStyle.cl_danger, font.f_heavy)} style={{fontSize:'2rem'}}>Page Not Found!</p>
        <img src={thumb_not_found} alt="thumb_not_found" style={{marginTop: '2rem'}}/>
        <PrimaryButton
            onclick={()=>handleGoBack()}
            text="GO BACK"
            style={{
                marginTop: '2rem',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}/>
    </div>)
}