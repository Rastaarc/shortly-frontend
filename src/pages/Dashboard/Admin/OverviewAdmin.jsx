import {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import {  message, Spin } from 'antd'
import { FaLink, FaTachometerAlt, FaUsers, FaEllipsisV } from 'react-icons/fa'
import ListLink from '../../../components/General/ListItems/ListLink'
import { Link } from 'react-router-dom'
import { GET_ADMIN_OVERVIEW } from '../../../graphql/queries'
import './OverviewAdmin.less'
import { MESSAGES } from '../../../utilities/constants'

function OverviewAdmin() {

    const {loading, error, data: queryData} = useQuery(GET_ADMIN_OVERVIEW,
        {fetchPolicy: 'cache-and-network'})

        const [overviewData, setOverviewData] = useState({
        links: [],
        totalLinks: 0,
        totalClicks: 0,
        totalUsers: 0
    })

    useEffect(()=>{
        if(queryData){
            //console.log(queryData);
            const {getAllLinks: {links}, totalLinks, totalClicks, totalUsers} = queryData
            setOverviewData({
                links,
                totalLinks,
                totalClicks,
                totalUsers
            })
        }

        if(error){
            message.error(MESSAGES.FETCH_FAILED_ADMIN)
        }
    }, [queryData, error])

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
                            <h2 className="counter">
                                {
                                loading?
                                    <Spin /> : overviewData.totalLinks
                                }
                            </h2>
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
                            <h2 className="counter">
                                {
                                loading?
                                    <Spin /> : overviewData.totalClicks
                                }
                            </h2>
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
                            <h2 className="counter">
                                {
                                loading?
                                    <Spin /> : overviewData.totalUsers
                                }
                            </h2>
                            <div className="down">
                                <Link to="/users">Manage Users...</Link>
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
                        {

                            loading ?

                                <Spin tip="Loading Links"/>

                            :
                            overviewData.links.length > 0 ?
                                overviewData.links.map(item => {
                                    return <ListLink
                                        key={item.id}
                                        short={item.shortLink}
                                        long={item.originalLink}
                                        icon={<FaEllipsisV/>}/>
                                    }
                                )
                            :
                                "No Data to display"
                        }
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
