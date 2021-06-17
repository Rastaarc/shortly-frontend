import { Layout, Button } from 'antd'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import {
    Link
} from 'react-router-dom'

import {
    HeartFilled,
} from '@ant-design/icons'
import './MainLayout.less'

const { Header, Footer } = Layout

export default function MainLayout({children}) {
    return (
        <>
            <Layout>
                <Header style={{padding: 0}} className="bgMain">
                    <div className="header container">
                        <div className="logo">
                            <Link to="/"><img src="images/logo.png" alt="" /></Link>
                        </div>
                        <div className="header__right-side">
                            <span className="signInButton">
                            <Link to="/login">
                                <Button type="primary" shape="round">Sign In</Button>
                            </Link>
                            </span>
                            <Link to="/signup">
                                <Button type="ghost" className="color-primary" shape="round">Sign Up</Button>
                            </Link>
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
