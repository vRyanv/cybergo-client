import React, {useState} from "react";
import Axios from 'axios'
import {enqueueSnackbar} from 'notistack'
import {LoadingButton } from '@mui/lab'
import './sign-in-page.css'
import FontStyle from '~/assets/css/font.module.css'

import {OutLineTextField} from '~/components/custom'
import IsValidEmail from "~/utils/email-util";


import {UseDocumentTitle, UseLocalStorage} from "~/hooks";

import {Message, Http, StatusCode} from '~/constants'
import {useNavigate} from "react-router-dom";

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
        Axios.post(`${Http.HOST}/security/sign-in`, {
            email,
            password
        }).then(function (response) {
            console.log(response)
            if(response.data.code === StatusCode.OK){
                navigate("/");
                const [getLocal, saveLocal] = UseLocalStorage()
                saveLocal(Http.USER_TOKEN, response.data.token)
                saveLocal(Http.ROLE, response.data.role)
            } else {
                alert('login fail')
            }
            setIsLoading(false)
        }).catch(function (error) {
            setIsLoading(false)
            console.log(error);
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