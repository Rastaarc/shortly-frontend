import { useEffect, useState }from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Layout } from 'antd'
import {HeartFilled} from '@ant-design/icons'
import { useAuth, useUserLoggedIn } from '../../hooks/auth'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import './DashboardLayout.less'
import { USERTYPES } from '../../../utilities/constants'


const {Header, Footer, Sider, Content } = Layout

const menuItems = [
    {
        title: "Dashboard",
        url: 'dashboard',
        user: USERTYPES.ALL,
        icon: 'd'
    },
    {
        title: "Links",
        url: 'links',
        user: USERTYPES.ALL,
        icon: 'd'
    },
    {
        title: "Users",
        url: 'users',
        user: USERTYPES.ADMIN,
        icon: 'd'
    },
    {
        title: "Subscriptions",
        url: 'subscriptions',
        user: USERTYPES.ALL,
        icon: 'd'
    },
]
const adminMenu = menuItems.filter(item=>
    (item.user === USERTYPES.ADMIN || item.user === USERTYPES.ALL)
)
const userMenu = menuItems.filter(item=>
    (item.user === USERTYPES.USER || item.user === USERTYPES.ALL)
)
function DashboardLayout({children}) {
    const userAccount = useAuth()
    const loggedIn = useUserLoggedIn()
    const [location, setLocation] = useState('')

    useEffect(() => {
        setLocation(window.location.pathname.split('/')[1])
        return () => {
            setLocation('')
        }
    }, [location])

    return loggedIn ? (
        <Layout>
            <Sider className="dashboard__sider">
                <div className="sider__contents">
                    <div className="sider__logo">
                        <Link to="/"><img src="images/logo__.png" alt="" /></Link>
                    </div>
                    <div className="sider">
                        <ul className="sider__menu">
                            {
                            (userAccount.user.userType === USERTYPES.USER)? 
                            
                                userMenu.map(
                                    item=> <li className={(location === item.url) ? 'active' : ''}
                                                key={item.url}>
                                                <Link to={`/${item.url}`}>
                                                    {item.title}
                                                </Link>
                                            </li>)
                            :
                                adminMenu.map(
                                    item=> <li className={(location === item.url) ? 'active' : ''}
                                                key={item.url}>
                                                <Link to={`/${item.url}`}>
                                                    {item.title}
                                                </Link>
                                            </li>)
                            }
                        </ul>
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
