import React, {useContext, useState} from "react";
import Axios from 'axios'

import './sign-in-page.css'
import FontStyle from '~/assets/css/font.module.css'

import {OutLineTextField} from '~/components/custom'
import PrimaryButton from "~/components/custom/button/PrimaryButton";
import IsValidEmail from "~/utils/email-util";


import {UserTokenContext} from '~/context/UserTokenContext'
import {UseLoading, UseDocumentTitle} from "~/hooks";

import {Message, Http, StatusCode} from '~/constants'
import {useNavigate} from "react-router-dom";

export default function SignInPage() {
    UseDocumentTitle('Sign in')
    const navigate = useNavigate();

    const [user_token, setUserToken] = useContext(UserTokenContext)
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

        UseLoading(true)
        Axios.post(`${Http.HOST}/security/sign-in`, {
            email,
            password
        }).then(function (response) {
            console.log(response)
            if(response.data.code === StatusCode.OK){
                navigate("/");
                setUserToken(response.data.token)
            } else {
                alert('login fail')
            }
            UseLoading(false)
        }).catch(function (error) {
            console.log(error);
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
                            <PrimaryButton
                                style={{
                                    width: '100%',
                                    border: 'none',
                                    padding: '15px 70px',
                                    margin: '2rem auto 2rem auto',
                                    borderRadius: '8px',
                                    display: 'block',
                                    fontWeight: 'bold'
                                }}
                                text={'Login'}
                                onclick={() => handleLogin()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}