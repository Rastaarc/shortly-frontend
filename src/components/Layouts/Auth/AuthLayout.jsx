import './AuthLayout.less'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { APP_NAME, DEVELOPED_BY } from '../../../utilities/constants'
import { HeartFilled } from '@ant-design/icons'
const { Footer } = Layout

function AuthLayout({children}) {
    return (
        <div className="auth__layout">
            <div className="container">
                <div className="logo__auth">
                    <Link to="/">
                        <img src="images/logo.png" alt="" />
                    </Link>
                </div>
                <div className="card__contents">
                    {children}
                </div>
                <Footer style={{textAlign: 'center'}}>
                    &copy;{new Date().getFullYear()}, {APP_NAME}.
                            All right reserved. Made with <HeartFilled /> by { DEVELOPED_BY }
                </Footer>
            </div>
        </div>
    )
}

export default AuthLayout
