import { useState } from 'react'
import AuthLayout from "../../../components/Layouts/Auth/AuthLayout"
import './Register.less'
import {
    Input,
    Button
} from 'antd'
import { Link } from 'react-router-dom'


function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <AuthLayout>
                <div className="register__wrapper">
                    <div className="register__heading">
                        SIGN UP
                    </div>
                    <div className="register__input">
                        <Input placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                        <Input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <Input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="register__button">
                        <Button shape="round" type="primary">Signup</Button>
                    </div>
                    <p className="other__text">
                        Already have account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </AuthLayout>
        </div>
    )
}

export default Register
