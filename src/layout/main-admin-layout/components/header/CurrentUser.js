import {KeyboardArrowDownIcon} from "~/assets/icon";
import React, {useEffect} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, ResourcePath} from "~/constants";

export default function CurrentUser() {
    useEffect(()=> {
        const [getLocal] = UseLocalStorage()
        const full_name_element = document.getElementById('full_name_current_user')
        full_name_element.innerText = getLocal(FieldName.FULL_NAME);

        const avatar_element =  document.getElementById('avatar_current_user')
        avatar_element.src = Http.HOST + ResourcePath.AVATAR_RES_PATH + getLocal(FieldName.AVATAR)

    }, [])
    return (
        <div style={{color: 'black'}} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2"
                 id="avatar_current_user"
                 alt="avatar"
                 style={{width: '40px', height: '40px'}}/>
            <span className="d-none d-lg-inline-flex" style={{marginLeft: '1rem'}} id="full_name_current_user"></span>
            <KeyboardArrowDownIcon className="icon-arrow"/>
        </div>
    )
}