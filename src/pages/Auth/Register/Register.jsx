import { useEffect, useState } from 'react'
import AuthLayout from "../../../components/Layouts/Auth/AuthLayout"
import './Register.less'
import {
    Input,
    Button,
    message,
} from 'antd'
import { Link } from 'react-router-dom'
import client from '../../../graphql/client'
import { CREATE_ACCOUNT } from '../../../graphql/queries'
import usePageTitle from '../../../components/hooks/title'

function Register({history}) {
    usePageTitle("Register")

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [usernameError, setUsernameError] = useState(0)
    const [emailError, setEmailError] = useState(0)
    const [passwordError, setPasswordError] = useState(0)
    const [passwordCError, setCPasswordError] = useState(0)

    const [formValid, setFormValid] = useState(false)
    const [formLoading, setFormLoading] = useState(false)

    useEffect(()=>{
        if(usernameError > 0
            && emailError > 0
            && passwordError > 0
            && passwordCError > 0
            ){
            setFormValid(true)
        }else{
            setFormValid(false)
        }
    },[username, email, usernameError, emailError, passwordError, passwordCError]);

    const validateInput = (type, value)=>{
        switch(type){
            case 'username':
                setUsername(value)
                //USERNAME VALIDATION
                const usernameReg = /^[a-zA-Z0-9_]{5,30}$/
                if(!usernameReg.test(value)){
                    setUsernameError(-1)
                }else{
                    setUsernameError(1)
                }
                break;

            case 'email':
                setEmail(value)
                //EMAIL VALIDATION
                const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!emailReg.test(String(value).toLowerCase())){
                    setEmailError(-1)
                }else{
                    setEmailError(1)
                }
                break;

            case 'password':
                setPassword(value)
                validateInput('cpassword', {p1: value, p2: confirmPassword})
                 //PASSWORD VALIDATION
                const passwordReg = /^[a-zA-Z_@]{5,30}$/
                if(!passwordReg.test(password)){
                    setPasswordError(-1)
                }else{
                    setPasswordError(1)
                }
                break;

            case 'cpassword':
                //p1 == password; p2 == confirmpassword
                setConfirmPassword(value.p2)
                //CONFIRM PASSWORD VALIDATION
                if(value.p1 !== value.p2){
                    setCPasswordError(-1)
                }else{
                    setCPasswordError(1)
                }
                break;

            default:
                break;
        }
    }

    const processRegistration =  async ()=>{
        if(!formValid){
            message.error("Please fix the error in your form", 4)
            return;
        }else{
            setFormLoading(true)

            await client.mutate({
                mutation: CREATE_ACCOUNT,
                variables: {
                    username,
                    email,
                    password
                }
            }).then(result=>{
                setFormLoading(false)
                const resultHolder = result.data.createAccount

                if(!resultHolder.ok){
                    message.error(resultHolder.message, 4)
                }else{
                    message.success('Account Created successfully',4)
                    history.push('/login')
                }
            }).catch(e=>{
                setFormLoading(false)
                message.error("Error Occurred while creating your account. Please try again", 4)
            })
        }
    }

    return (
        <div>
            <AuthLayout>
                <div className="auth__body-wrapper">
                    <div className="auth__heading-text">
                        SIGN UP
                    </div>
                    <div className="auth__input">
                        <Input
                            className={(usernameError < 0) && 'has__error-input'}
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e)=> validateInput(e.target.name,e.target.value)}
                            onBlur={(e)=> validateInput(e.target.name,e.target.value)}
                            />
                        {(usernameError < 0) && <span className="has__error-text">
                            {'Invalid username supplied. It can only contain [a-z,A-Z, 0-9, _], mininum of 5 and maximum of 30'}
                            </span>}

                        <Input
                            className={(emailError < 0) && 'has__error-input'}
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e)=> validateInput(e.target.name,e.target.value)}
                            onBlur={(e)=> validateInput(e.target.name,e.target.value)}
                            />
                        {(emailError < 0) && <span className="has__error-text">
                                Invalid email supplied, please try again
                            </span>}

                        <Input
                            className={(passwordError < 0) && 'has__error-input'}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e)=> validateInput(e.target.name,e.target.value)}
                            onBlur={(e)=> validateInput(e.target.name,e.target.value)}
                            />
                        {(passwordError < 0) && <span className="has__error-text">
                            Please enter a valid password with a minimum of 5 characters for your password
                            </span>}

                        <Input
                            type="password"
                             className={(passwordCError < 0) && 'has__error-input'}
                            placeholder="Confirm Password"
                            name="cpassword"
                            value={confirmPassword}
                            onFocus={(e)=> validateInput(e.target.name,{p1: password, p2: e.target.value})}
                            onChange={(e)=> validateInput(e.target.name,{p1: password, p2: e.target.value})}
                            onBlur={(e)=> validateInput(e.target.name,{p1: password, p2: e.target.value})} />
                        {(passwordCError < 0) && <span className="has__error-text">
                                The two passwords must match. Please try again
                            </span>}
                    </div>
                    <div className="auth__submit-button">
                        <Button disabled={!formValid} loading={formLoading} shape="round" type="primary" onClick={()=> processRegistration()}>Signup</Button>
                    </div>
                    <p className="auth__other-text">
                        Already have account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </AuthLayout>
        </div>
    )
}

export default Register
