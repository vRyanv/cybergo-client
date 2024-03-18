import {Stack} from "@mui/material";
import clsx from 'clsx'
import style from '../../../user-list-page/partials/user-card/user-card.module.css'

import {UseViewLargeImg} from '~/hooks'

export default function UserInformation({
                                            full_name,
                                            id_number,
                                            phone,
                                            address,
                                            avatar,
                                        }) {

    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={'row'}
                   justifyContent="space-between" >
                <h6 style={{width: 'fit-content'}}>User Information</h6>
                <div>
                    <span className={clsx(style.user_type, style.user_base)}>Role: USER</span>
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
                    <p className="text-dark">{id_number}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Phone</p>
                    <p className="text-dark">{phone}</p>
                </div>
            </Stack>
            <div className="mt-3">
                <p className={'title-field-driver-registration rounded'}>Address</p>
                <p className="text-dark">{address}</p>
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