import {Skeleton, Stack} from "@mui/material";
import {Cancel, Security} from "~/assets/icon";
import React, {useEffect, useState} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Int, Message, StatusCode} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {LoadingButton} from "@mui/lab";

export default function EnableF2APage() {
    const [two_factor_auth, setTwoFactorAuth] = useState({});
    const [is_loading_qr_code, setIsLoadingQrCode] = useState(true);
    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/api/security/2fa/qr-code`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            setTimeout(() => {
                setIsLoadingQrCode(false)
                if (response.data.code !== StatusCode.OK) {
                    enqueueSnackbar(Message.INVALID_YOUR_REQUEST, {variant: 'error'})
                    return
                }
                console.log(response.data)
                setTwoFactorAuth({
                    qr_code: response.data.qr_code,
                    is_2fa_enable: response.data.is_2fa_enable,
                    email: response.data.email,
                })
            }, Int.DELAY_TIMEOUT_API)

        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }, [])

    const [is_loading, setIsLoading] = useState(false)
    const onUpdate2FAStatus = (status) => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.put(
            `${Http.HOST}/api/security/2fa/update-2fa-status`,
            {status},
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            setTimeout(() => {
                setIsLoading(false)
                if (response.data.code !== StatusCode.UPDATED) {
                    enqueueSnackbar(Message.INVALID_YOUR_REQUEST, {variant: 'error'})
                    return
                }
                console.log(response.data)
                setTwoFactorAuth({
                    ...two_factor_auth,
                    is_2fa_enable: response.data.status
                })
                enqueueSnackbar('Update success', {variant: 'success'})
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    return (
        <Stack direction={'column'}
               style={{width: 'fit-content', margin: 'auto', textAlign: 'center', marginTop: '5rem'}}>
            <h3>Two-Factor Authentication (2FA)</h3>
            <p>Scan this QR code and then click enable button</p>
            {is_loading_qr_code ?
                (<Skeleton variant="rounded"
                           sx={{fontSize: '1rem', marginTop: '3rem'}}
                           width={250} height={250}
                           style={{marginLeft: 'auto', marginRight: 'auto',}}/>)
                :
                (<>
                    <p>Your email: <strong>{two_factor_auth.email}</strong></p>
                    <img src={two_factor_auth.qr_code}
                         alt="qr code" width={'m'}
                         height={250}
                         style={{
                             margin: 'auto',
                             marginBottom: '3rem',
                             marginTop: '2rem'
                         }}/>
                    <LoadingButton
                        style={{width: 'fit-content', margin: 'auto'}}
                        color={two_factor_auth.is_2fa_enable ? 'error' : 'success'}
                        size={'medium'}
                        variant="outlined"
                        loading={is_loading}
                        loadingPosition={'start'}
                        onClick={() => onUpdate2FAStatus(!two_factor_auth.is_2fa_enable)}
                        startIcon={two_factor_auth.is_2fa_enable ? <Cancel/> : <Security/>}>
                        {two_factor_auth.is_2fa_enable ? 'Disable' : 'Enable'}
                    </LoadingButton></>)
            }
        </Stack>)
}