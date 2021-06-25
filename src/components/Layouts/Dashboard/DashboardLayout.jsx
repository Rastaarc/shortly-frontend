import { useEffect, useState }from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Layout, message, Button } from 'antd'
import {HeartFilled} from '@ant-design/icons'
import { useUserLoggedIn, logoutAccount, useAccount } from '../../../hooks/auth'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import './DashboardLayout.less'
import { USERTYPES, SCREEN_TYPES } from '../../../utilities/constants'
import {
    FaSignOutAlt,
    FaRegUserCircle,
    FaChartPie,
    FaCreditCard,
    FaUsers,
    FaLink,
} from 'react-icons/fa'
import { useScreenType } from '../../../hooks/windowSize'

const {Header, Footer, Sider, Content } = Layout

const menuItems = [
    {
        title: "Dashboard",
        url: 'dashboard',
        user: USERTYPES.ALL,
    },
    {
        title: "Links",
        url: 'links',
        user: USERTYPES.ALL,
    },
    {
        title: "Users",
        url: 'users',
        user: USERTYPES.ADMIN,
    },
    {
        title: "Subscriptions",
        url: 'subscriptions',
        user: USERTYPES.ALL,
    },
]
const adminMenu = menuItems.filter(item=>
    (item.user === USERTYPES.ADMIN || item.user === USERTYPES.ALL)
)
const userMenu = menuItems.filter(item=>
    (item.user === USERTYPES.USER || item.user === USERTYPES.ALL)
)

function DashboardLayout({children}) {
    const screenType = useScreenType()
    const userAccount = useAccount()
    const [loggedIn, setLoggedIn] = useUserLoggedIn()
    const [location, setLocation] = useState('')
    const [redirectToHome, setRedirectToHome] = useState(false)

    useEffect(() => {
        setLocation(window.location.pathname.split('/')[1])
        return () => {
            setLocation('')
        }
    }, [location])

    const doLogout = ()=>{
        //e.preventDefault()
        if(logoutAccount()){
            setLoggedIn(false)
            setRedirectToHome(true)
        }else{
            message.error("Failed to logged out your account, please try again",4)
        }
    }
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
                                                    {
                                                        (item.url === 'dashboard')? <FaChartPie/>
                                                        : (item.url === 'links') ? <FaLink/>
                                                        : (item.url === 'subscriptions') ? <FaCreditCard/>
                                                        : ''
                                                    }
                                                    {item.title}
                                                </Link>
                                            </li>)
                            :
                                adminMenu.map(
                                    item=> <li className={(location === item.url) ? 'active' : ''}
                                    key={item.url}>
                                                <Link to={`/${item.url}`}>
                                                    {
                                                        (item.url === 'dashboard')? <FaChartPie/>
                                                        : (item.url === 'links') ? <FaLink/>
                                                        : (item.url === 'subscriptions') ? <FaCreditCard/>
                                                        : (item.url === 'users')? <FaUsers/>
                                                        :''
                                                    }
                                                    {item.title}
                                                </Link>
                                            </li>)
                            }
                        </ul>
                        <div className="sider__user">
                            <div className="username">
                                <FaRegUserCircle fontSize="20px"/>
                                <p>{userAccount.user.username}</p>
                                {/* <p>{userAccount.user.email}</p> */}
                            </div>
                            <div className="logout">
                                <FaSignOutAlt fontSize="18px" onClick={doLogout}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Sider>
            <Layout>
                <Header className="dashboard__header">
                    <div className="header__logo__mobile">
                        <Link to="/"><img src="images/logo__.png" alt="" /></Link>
                    </div>
                    <div className="header__content">
                        {
                            (location === 'dashboard') &&
                            <Button type="primary" shape="round" size={(screenType >= SCREEN_TYPES.MOBILE_LARGE)? 'small': 'medium'}>
                                <Link to="/links">
                                    New Link
                                </Link>
                            </Button>
                        }
                    </div>
                    <div className="header__user">
                        <div className="user">
                            <FaRegUserCircle/>
                            <div className="profile">
                                <p className="username">{userAccount.user.username}</p>
                                <span className="email">{userAccount.user.email}</span>
                            </div>
                        </div>
                        <div className="user__mobile">
                            Mobile User
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Content className="contents__container">{children}</Content>
                    <Footer className="dashboard__footer">
                        &copy;{new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with <HeartFilled /> by { DEVELOPED_BY }
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    ) : redirectToHome ? <Redirect to="/" /> : <Redirect to="/login" />
}

export default DashboardLayout
