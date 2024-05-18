import {Rating, Stack} from "@mui/material";

import {UseViewLargeImg} from '~/hooks'
import React from "react";
import {Http, ResourcePath} from "~/constants";

export default function UserInformation({
                                            full_name,
                                            id_number,
                                            phone,
                                            address,
                                            avatar,
                                            start
                                        }) {
    avatar = Http.HOST + ResourcePath.AVATAR_RES_PATH + avatar

    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={'row'}
                   justifyContent="space-between" >
                <h6 style={{width: 'fit-content'}}>User Information</h6>
                <div>
                    <Rating name="read-only" value={start} readOnly/>
                </div>
            </Stack>
            <hr/>
            <Stack justifyContent="space-between"
                   direction={{xs: 'column', sm: 'row'}}
                   spacing={3}>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Full Name</p>
                    <p className={`text-bg-secondary`}>{full_name}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Identity Number</p>
                    <p className="text-dark">{id_number ? id_number : 'Not update'}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Phone</p>
                    <p className="text-dark">{phone}</p>
                </div>
            </Stack>
            <div className="mt-3">
                <p className={'title-field-driver-registration rounded'}>Address</p>
                <p className="text-dark">{address ? address : 'Not update'}</p>
            </div>
            <Stack
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Avatar</p>
                    <img
                        alt="avatar"
                        onClick={() => UseViewLargeImg(avatar)}
                        src={avatar}
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'40%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
            </Stack>
        </div>
    )
}