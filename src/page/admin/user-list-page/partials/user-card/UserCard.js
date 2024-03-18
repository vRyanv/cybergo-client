import clsx from 'clsx'
import React from "react";
import {enqueueSnackbar} from 'notistack'
import {UseViewLargeImg} from '~/hooks'
import {IconButton, Stack} from "@mui/material";
import user_card_style from './user-card.module.css'

import {
    ContactEmergencyTwoToneIcon,
    LocalPhoneTwoToneIcon,
    MailTwoToneIcon,
    ContentCopyIcon
} from '~/assets/icon'

import {Message} from '~/constants'
import {useNavigate} from "react-router-dom";

export default function UserCard({avatar, full_name, id_number, phone, email, role, acc_status}) {
    const navigate = useNavigate()
    const onUserCardClicked = function (e) {
        const node_names = ['BUTTON', 'IMG', 'svg', 'path']
        if (!node_names.includes(e.target.nodeName)) {
            navigate(`/user/detail/${123}`)
        }
    }

    const onBtnCopyClicked = (id_number, phone, email) => {
        const copy_text = `ID: ${id_number}\nphone: ${phone}\nemail: ${email}`
        navigator.clipboard.writeText(copy_text);
        enqueueSnackbar(Message.COPY_INFO_SUCCESS,{ variant: 'success' })
    }

    return (
        <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-inline-block">
            <div className={clsx(user_card_style.nft, ['bg-blue-sky-light'])}
                 onClick={onUserCardClicked}>
                <div className={clsx(user_card_style.main)}>
                    <img className={clsx(user_card_style.tokenImage, [''])}
                         data-bs-target={'#image_larger_modal'}
                         data-bs-toggle={'modal'}
                         src={avatar}
                         onClick={() => UseViewLargeImg(avatar)}
                         alt="avatar"/>
                    <h4 className={'mt-3'}>{full_name}</h4>
                    <Stack direction={'column'}>
                        <Stack justifyContent="flex-start"
                               alignItems="center"
                               spacing={3}
                               direction={'row'}>
                            <div>
                                <ContactEmergencyTwoToneIcon/>
                            </div>
                            <div>
                                <p className={clsx(user_card_style.description)}>{id_number}</p>
                            </div>
                        </Stack>
                        <Stack justifyContent="flex-start"
                               alignItems="center"
                               spacing={3}
                               direction={'row'}>
                            <div>
                                <LocalPhoneTwoToneIcon/>
                            </div>
                            <div>
                                <p className={clsx(user_card_style.description)}>{phone}</p>
                            </div>
                        </Stack>
                        <Stack justifyContent="flex-start"
                               alignItems="center"
                               spacing={3}
                               direction={'row'}>
                            <div>
                                <MailTwoToneIcon/>
                            </div>
                            <div>
                                <p className={clsx(user_card_style.description)}>{email}</p>
                            </div>
                        </Stack>
                    </Stack>
                    <hr/>
                    <div>
                        <Stack justifyContent="space-between"
                               alignItems="center"
                               direction={'row'}>
                            <div>
                                <span className={clsx(user_card_style.user_base, user_card_style.user_type)}>{role}</span>
                            </div>
                            <div>
                                <span className={clsx(user_card_style.user_base, user_card_style.user_verify)}>
                                    {acc_status}
                                </span>
                            </div>
                            <div>
                                <IconButton
                                    onClick={()=> onBtnCopyClicked(id_number, phone, email)}
                                    color={'info'}
                                    size="large">
                                    <ContentCopyIcon/>
                                </IconButton>
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}