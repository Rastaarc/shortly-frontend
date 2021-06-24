import { FaLink, FaTachometerAlt } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './Overview.less'



export default function Home() {

    return (
        <div>
            <div className="overview">
                <h3 className="title">Overview</h3>
                <div className="contents">
                    <div className="card">
                        <div className="content">
                            <div className="top">
                                <h4 className="title">Links</h4>
                                <FaLink/>
                            </div>
                            <h2 className="counter">
                                17
                            </h2>
                            <div className="down">
                                <Link to="/links">Manage links...</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content">
                            <div className="top">
                                <h4 className="title">Clicks</h4>
                                <FaTachometerAlt/>
                            </div>
                            <h2 className="counter">
                                324
                            </h2>
                            <div className="down">
                                <Link to="#">Clicks Analysis...</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="recent-activities">
                <h3 className="title">Recent Activities</h3>
                <div className="contents">
                    <div className="card">
                        <h5 className="title">Latest Links</h5>
                    </div>
                    <div className="card">
                        <h5 className="title">Subscriptions</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
