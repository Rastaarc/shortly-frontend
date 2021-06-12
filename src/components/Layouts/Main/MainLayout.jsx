import React from 'react'
import { Layout, Button } from 'antd'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import './MainLayout.less'

const { Header, Footer } = Layout

export default function MainLayout({children}) {
    return (
        <>
            <Layout>
                <Header style={{padding: 0}} className="bgMain">
                    <div className="header">
                        <div className="logo">
                            <img src="images/logo.png" alt="" />
                        </div>
                        <div>
                            <span className="signInButton">
                            <Button type="primary" shape="round">Sign In</Button>
                            </span>
                            <Button type="ghost" shape="round">Sign Up</Button>
                        </div>
                    </div>
                </Header>
                <Layout className="bgMain">
                    {children}
                </Layout>
                <Layout>
                    <Footer className="bgFooter">
                        <div className="footer">
                            &copy; {new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with love by { DEVELOPED_BY }
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}
