import {FormControl, InputLabel, OutlinedInput, Stack} from "@mui/material";
import {CheckIcon} from "~/assets/icon";
import React from "react";
import {LoadingButton} from "@mui/lab";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {FieldName, Http, Int, Message, Role, StatusCode} from "~/constants";
import {enqueueSnackbar} from "notistack";
import {UseLocalStorage} from "~/hooks";
import {useSocket} from "~/service/socket/SocketService";

export default function VerifyF2APage() {
    const {email} = useParams()
    const socket = useSocket()
    const navigate = useNavigate()
    const [is_loading, setIsLoading] = React.useState(false);
    const [otp_code, setOTPCode] = React.useState(false);
    const onSubmitToken = () => {
        setIsLoading(true)
        axios.post(
            `${Http.HOST}/api/security/2fa/verify`,
            {
                email,
                otp_code
            }
        ).then((response) => {
            setTimeout(() => {
                setIsLoading(false)
                if (response.data.code === StatusCode.NOT_FOUND) {
                    enqueueSnackbar('Not found user', {variant: 'error'})
                } else if(response.data.code === StatusCode.UNAUTHORIZED){
                    enqueueSnackbar('Invalid OTP code', {variant: 'error'})
                } else {
                    const [getLocal, saveLocal] = UseLocalStorage()
                    saveLocal(FieldName.USER_TOKEN, response.data.token)
                    saveLocal(FieldName.ROLE, response.data.role)
                    saveLocal(FieldName.AVATAR, response.data.avatar)
                    saveLocal(FieldName.FULL_NAME, response.data.full_name)
                    socket.auth = {token: response.data.token}
                    socket.connect()
                    if(response.data.role === Role.ADMIN){
                        navigate("/dashboard");
                    } else {
                        navigate("/");
                    }
                }
            }, Int.DELAY_TIMEOUT_API)

        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    return (<div className="container-fluid">
        <div className="row justify-content-center" style={{padding: '3rem'}}>
            <div className="col-sm-12 col-md-3 col-lg-3 mt-3" style={{textAlign: 'center'}}>
                <h3>Two-Factor Authentication</h3>
                <p>Your email: <strong>{email}</strong></p>
                <Stack direction={'column'} spacing={5} style={{marginTop: '3rem'}}>
                    <FormControl style={{minWidth: '15rem'}} variant="outlined" size="small">
                        <InputLabel htmlFor="input_token">OTP code</InputLabel>
                        <OutlinedInput
                            id="input_token"
                            type={'number'}
                            label="OTP code"
                            value={otp_code}
                            onChange={(e) => setOTPCode(e.target.value)}
                        />
                    </FormControl>
                    <LoadingButton
                        style={{marginTop: '2rem'}}
                        color={'success'}
                        variant="outlined"
                        loading={is_loading}
                        loadingPosition={'start'}
                        onClick={() => onSubmitToken()}
                        startIcon={<CheckIcon/>}>
                        Verify
                    </LoadingButton>
                </Stack>
            </div>
        </div>
    </div>)
}