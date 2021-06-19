//import { useEffect } from 'react'
import { Layout, Button } from 'antd'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import {
    Link
} from 'react-router-dom'

import {
    HeartFilled,
} from '@ant-design/icons'
import './MainLayout.less'
import { /*useAuth,*/ useUserLoggedIn } from '../../hooks/auth'


const { Header, Footer } = Layout

export default function MainLayout({children}) {
    //const userData = useAuth()
    const userLoggedIn = useUserLoggedIn()

    return (
        <>
            <Layout>
                <Header style={{padding: 0}} className="bgMain">
                    <div className="header container">
                        <div className="logo">
                            <Link to="/"><img src="images/logo_.png" alt="" /></Link>
                        </div>
                        <div className="header__right-side">
                            {userLoggedIn?
                            (<div className="loggedin__side">
                                <Link style={{paddingRight: 10}} to="/dashboard">DASHBOARD</Link>

                                <Link to="/dashboard">LOGOUT</Link>
                            </div>) :
                            (<div>
                                <span className="signInButton">
                                <Link to="/login">
                                    <Button type="primary" shape="round">Sign In</Button>
                                </Link>
                                </span>
                                <Link to="/signup">
                                    <Button type="ghost" className="color-primary" shape="round">Sign Up</Button>
                                </Link>
                            </div>
                            )}
                        </div>
                    </div>
                </Header>
                <Layout className="bgMain">
                    {children}
                </Layout>
                <Layout>
                    <Footer className="bgFooter">
                        <div className="footer">
                            &copy;{new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with <HeartFilled style={{color: '#eee'}}/> by { DEVELOPED_BY }
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
