import {BlockTwoToneIcon, Unlock} from "~/assets/icon";
import React, {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {AccountStatus, FieldName, Http, Int, Message, StatusCode} from "~/constants";
import {UseLocalStorage} from "~/hooks";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import BanDialog from './BanDialog'

export default function AccountStatusButton({user_id, account_status}) {
    const [is_loading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(account_status)
    const [is_open_dialog, setIsOpenDialog] = useState(false)
    const onBanUserClicked = () => {
        setIsOpenDialog(true)
    }

    const onUnlockUser = () => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.put(
            `${Http.HOST}/admin/user-management/unlock-user`,
            {user_id},
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            console.log(response.data)
            setTimeout(() => {
                setIsLoading(false)
                if (response.data.code !== StatusCode.UPDATED) {
                    setIsLoading(false)
                    enqueueSnackbar('Not found user', {variant: 'error'})
                    return
                }
                setStatus(AccountStatus.ACTIVATED)
                enqueueSnackbar('User unlocked successfully', {variant: 'success'})

            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    const onBanUserSuccess = () => {
        setStatus(AccountStatus.BANNED)
        setIsOpenDialog(false)
    }

    return (<>
            <BanDialog
                is_open={is_open_dialog}
                user_id={user_id}
                setOpen={setIsOpenDialog}
                callback={onBanUserSuccess}/>
            {status === AccountStatus.ACTIVATED ?
                (<LoadingButton color={'danger'}
                                variant="outlined"
                                loading={is_loading}
                                onClick={() => onBanUserClicked()}
                                loadingPosition="start"
                                startIcon={<BlockTwoToneIcon/>}>
                    Ban user
                </LoadingButton>)
                :
                (<LoadingButton color={'success'}
                                variant="outlined"
                                loading={is_loading}
                                onClick={onUnlockUser}
                                loadingPosition="start"
                                startIcon={<Unlock/>}>
                    unlock
                </LoadingButton>)
            }</>
    )
}