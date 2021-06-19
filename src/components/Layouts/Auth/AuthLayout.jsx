import { useEffect } from 'react'
import './AuthLayout.less'
import { Link, Redirect } from 'react-router-dom'
import { Layout, message } from 'antd'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import { HeartFilled } from '@ant-design/icons'
import { useAuth, useUserLoggedIn } from '../../hooks/auth'
const { Footer } = Layout

function AuthLayout({children, match}) {

    const auth = useAuth()
    const userLoggedIn = useUserLoggedIn()

    useEffect(() => {
        if(userLoggedIn){
            message.error(`You have already loggedin as ${auth.user.username}`,4)
        }
    }, [auth, match, userLoggedIn])

    return userLoggedIn ? <Redirect to="/"/> : (
        <div className="auth__layout">
            <div className="container">
                <div className="logo__auth">
                    <Link to="/">
                        <img src="images/logo_.png" alt="" />
                    </Link>
                </div>
                <div className="card__contents">
                    {children}
                </div>
                <Footer className="auth__footer">
                    &copy;{new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with <HeartFilled /> by { DEVELOPED_BY }
                </Footer>
            </div>
        </div>
    )
}

export default AuthLayout
