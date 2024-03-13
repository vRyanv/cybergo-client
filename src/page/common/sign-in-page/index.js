import {useState} from "react";
import './sign-in-page.css'

import OutLineTextField from '../../../components/custom/text-field/out-line-text-field'
import PrimaryButton from "../../../components/custom/button/PrimaryButton";
import IsValidEmail from "../../../utils/email-util";

import Message from '../../../constants/message'
export default function SignInPage(){
    const [email, setEmail] = useState();
    const [is_error_email, setIsErrorEmail] = useState(false);
    const [error_email_mess, setErrorEmailMess] = useState();
    const [pass, setPass] = useState();
    const [is_error_pass, setIsErrorPass] = useState();
    const [error_pass_mess, setErrorPasslMess] = useState();

    const onEmailChange = (e) => {
        setIsErrorEmail(false)
        setErrorEmailMess('')
        setEmail(e.target.value)
    }

    const handleLogin = () => {
        if(email === undefined || !IsValidEmail(email)){
            setIsErrorEmail(true)
            setErrorEmailMess(Message.INVALID_EMAIL)
        }
    }
    return (
        <div>
            <section className="login">
                <div className="login_box">
                    <div className="right">
                        <div className="right-inductor">
                        </div>
                    </div>
                    <div className="left">
                        <div className="contact">
                            <form action="">
                                <h3>SIGN IN</h3>
                                <OutLineTextField
                                    onChange={(e) => onEmailChange(e)}
                                    style={{width: '100%'}}
                                    label={'Email'}
                                    is_error={is_error_email}
                                    helperText={error_email_mess}
                                />
                                <OutLineTextField
                                    onChange={(e) => setPass(e.target.value)}
                                    style={{width: '100%', marginTop: '2.5rem'}}
                                    label={'Password'}
                                    is_error={false}
                                />
                                <p style={{
                                    textAlign: 'end',
                                    display: "block",
                                    fontSize: '.8rem',
                                    marginTop: '1rem',
                                    color: '#f57c00',
                                    cursor: 'pointer'
                                }}>Forget password?</p>
                                <PrimaryButton
                                    style={{
                                        border: 'none',
                                        padding: '15px 70px',
                                        margin: 'auto',
                                        borderRadius: '8px',
                                        display: 'block',
                                        marginTop: '120px',
                                        fontWeight: 'bold'
                                    }}
                                    text={'Login'}
                                    onclick={() => handleLogin()}/>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}