import { useState, useEffect } from 'react'
import {
    Input,
    Button,
    message
} from 'antd'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../components/Layouts/Auth/AuthLayout'
import './Login.less'
import client from '../../../graphql/client'
import { LOGIN_ACCOUNT } from '../../../graphql/queries'
import usePageTitle from '../../../hooks/title'

export default function Login({history}) {

    usePageTitle("Login")

    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')
    const [canLogin, setCanLogin] = useState(false)
    const [processingLogin, setProcessingLogin] = useState(false)

    useEffect(()=>{
        if(emailOrUsername.length >= 5 && password.length >= 5){
            setCanLogin(true)
        }else{
            setCanLogin(false)
        }
    }, [emailOrUsername, password]);

    const processLogin = async ()=>{
        setProcessingLogin(true)

        await client.mutate({
            mutation: LOGIN_ACCOUNT,
            variables: {
                emailOrUsername,
                password
            }
        }).then(result => {
            const { data: {loginAccount: account} } = result

            if(account.loggedIn){
                message.success("Account Logged in successfully", 4)
                const accountData = JSON.stringify({user: account.user, token: account.token})
                localStorage.setItem("account", accountData)
                history.replace('/dashboard')
            }else{
                message.error(account.message,4)
            }

        }).catch(e=>{
            console.log(e)
            message.error("Error occurred while fetching your account",4)
        })
        setProcessingLogin(false)
    }

    return (
        <>
           <AuthLayout>
               <div className="auth__body-wrapper">
                   <div className="auth__heading-text">
                        LOGIN
                    </div>
                    <div className="auth__input">
                        <Input
                            placeholder="Username or Email"
                            type="text"
                            name="emailOrUsername"
                            value={emailOrUsername}
                            onChange={(e)=> setEmailOrUsername(e.target.value)}/>

                        <Input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className="auth__submit-button">
                        <Button
                            shape="round"
                            loading={processingLogin}
                            disabled={!canLogin}
                            type="primary"
                            onClick={()=>processLogin()}>
                            Login
                        </Button>
                    </div>
                    <div className="auth__other-text">
                        <p>Doesn't have an account? <Link to="/signup">Sign Up</Link></p>
                        <p><Link to="/forgotpassword">Forgot Password?</Link></p>
                    </div>

               </div>
           </AuthLayout>
        </>
    )
}
