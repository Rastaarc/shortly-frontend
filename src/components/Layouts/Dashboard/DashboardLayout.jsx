import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Layout } from 'antd'
import {HeartFilled} from '@ant-design/icons'
import { useUserLoggedIn } from '../../hooks/auth'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import './DashboardLayout.less'


const {Header, Footer, Sider, Content } = Layout

function DashboardLayout({children}) {
    const loggedIn = useUserLoggedIn()

    return loggedIn ? (
        <Layout>
            <Sider className="dashboard__sider">
                <div className="sider__contents">
                    <div className="sider__logo">
                        <Link to="/"><img src="images/logo__.png" alt="" /></Link>
                    </div>
                    <div className="sider__menu">
                        Menu
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header className="dashboard__header">
                    Header
                </Header>
                <Layout>
                    <Content className="contents__container">{children}</Content>
                    <Footer style={{textAlign: 'center'}}>
                        &copy;{new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with <HeartFilled /> by { DEVELOPED_BY }
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    ) : <Redirect to="/login" />
}

export default DashboardLayout
