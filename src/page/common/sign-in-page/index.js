import React, {useState} from "react";
import {enqueueSnackbar} from 'notistack'
import {LoadingButton} from '@mui/lab'
import './sign-in-page.css'
import FontStyle from '~/assets/css/font.module.css'

import {OutLineTextField} from '~/components/custom'
import IsValidEmail from "~/utils/email-util";


import {UseDocumentTitle, UseLocalStorage} from "~/hooks";

import {Http, Message, Role, StatusCode} from '~/constants'
import {useNavigate} from "react-router-dom";
import {useSocket} from "~/service/socket/SocketService";
import {FieldName} from "~/constants/FieldName";
import axios from "axios";

export default function SignInPage() {
    UseDocumentTitle('Sign in')
    const navigate = useNavigate();
    const [is_loading, setIsLoading] = useState(false)

    const [email, setEmail] = useState();
    const [is_error_email, setIsErrorEmail] = useState(false);
    const [error_email_mess, setErrorEmailMess] = useState();
    const [password, setPass] = useState();
    const [is_error_pass, setIsErrorPass] = useState();
    const [error_pass_mess, setErrorPasslMess] = useState();

    const onEmailChange = (value) => {
        setIsErrorEmail(false)
        setErrorEmailMess('')
        setEmail(value)
    }

    const onPassChange = (value) => {
        setIsErrorPass(false)
        setErrorPasslMess('')
        setPass(value)
    }

    const socket = useSocket()
    const handleLogin = () => {
        let is_error = false
        if (email === undefined || !IsValidEmail(email)) {
            setIsErrorEmail(true)
            setErrorEmailMess(Message.INVALID_EMAIL)
            is_error = true
        }
        if (password === undefined) {
            setIsErrorPass(true)
            setErrorPasslMess(Message.PASSWORD_IS_REQUIRED)
            is_error = true
        }
        if (is_error) {
            return
        }
        setIsLoading(true)
        axios.post(`${Http.HOST}/api/security/sign-in`, {
            email,
            password
        }).then(function (response) {
            console.log("response: ", response);
            setIsLoading(false)
            if (response.data.code === StatusCode.TWO_FACTER_AUTHENTICATION) {
                navigate(`/verify-2fa/${response.data.email}`);
            } else if (response.data.code === StatusCode.VERIFY) {
                enqueueSnackbar('The account needs phone number verification', {variant: 'warning'})
            } else if (response.data.code === StatusCode.NOT_FOUND) {
                enqueueSnackbar('Invalid email or password!', {variant: 'error'})
            } else if (response.data.code === StatusCode.ACCOUNT_BANNED) {
                enqueueSnackbar('Account has been banned!', {variant: 'error'})
            } else {
                const [getLocal, saveLocal] = UseLocalStorage()
                saveLocal(FieldName.USER_TOKEN, response.data.token)
                saveLocal(FieldName.ROLE, response.data.role)
                saveLocal(FieldName.AVATAR, response.data.avatar)
                saveLocal(FieldName.FULL_NAME, response.data.full_name)
                socket.auth = {token: response.data.token}
                socket.connect()
                if (response.data.role === Role.ADMIN) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            }
        }).catch(function (error) {
            setIsLoading(false)
            console.log("error: ", error);
            enqueueSnackbar('Something went wrong, can\'t connect to server', {variant: 'error'})
        });

    }
    return (
        <div className="container-fluid position-relative d-flex p-0 sign-in-body">
            <div className="container-fluid">
                <div className="row h-100 align-items-center justify-content-center sign-background"
                     style={{minHeight: '100vh'}}>
                    <div className="col-12 col-sm-9 col-md-8 col-lg-6 col-xl-5">
                        <div className="bg-blur rounded p-4 p-sm-5 my-4 mx-3">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <h3 className={`sign-in-title ${FontStyle.f_black_semibold}`}>SIGN IN</h3>
                            </div>
                            <OutLineTextField
                                type={"email"}
                                onChange={(e) => onEmailChange(e.target.value)}
                                style={{width: '100%'}}
                                label={'Email'}
                                is_error={is_error_email}
                                helperText={error_email_mess}
                            />
                            <OutLineTextField
                                type={"password"}
                                onChange={(e) => onPassChange(e.target.value)}
                                style={{width: '100%', marginTop: '2.5rem'}}
                                label={'Password'}
                                is_error={is_error_pass}
                                helperText={error_pass_mess}
                            />
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <p></p>
                                <p style={{
                                    textAlign: 'end',
                                    display: "block",
                                    fontSize: '1rem',
                                    marginTop: '1rem',
                                    color: '#f57c00',
                                    cursor: 'pointer'
                                }}>Forget password?</p>
                            </div>
                            <LoadingButton
                                onClick={() => handleLogin()}
                                fullWidth
                                text={'Login'}
                                sx={{color: 'white'}}
                                size="medium"
                                color="primary"
                                loading={is_loading}
                                variant="contained"
                            >Login</LoadingButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}