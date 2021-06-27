//import {useState, useEffect} from 'react'
import { FaLink, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './OverviewAdmin.less'

function OverviewAdmin() {

    return (
        <div>
            <div className="overview">
                <h3 className="title">Overview</h3>
                <div className="contents">
                    <div className="card">
                        <div className="content">
                            <div className="top">
                                <div className="title">Links</div>
                                <FaLink/>
                            </div>
                            <h2 className="counter">17</h2>
                            <div className="down">
                                <Link to="/links">Manage Links...</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content">
                            <div className="top">
                                <div className="title">Clicks</div>
                                <FaTachometerAlt/>
                            </div>
                            <h2 className="counter">177</h2>
                            <div className="down">
                                <Link to="/links">View Clicks...</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="content">
                            <div className="top">
                                <div className="title">Users</div>
                                <FaUsers/>
                            </div>
                            <h2 className="counter">3521</h2>
                            <div className="down">
                                <Link to="/links">Manage Users...</Link>
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
                        <h2 className="text--center primary--text">
                            Coming Soon!
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverviewAdmin
