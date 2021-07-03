import {useState, useEffect} from 'react'
import { Spin, message as alert } from 'antd'
import { useQuery } from '@apollo/client'
import { FaLink, FaTachometerAlt } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { GET_USER_OVERVIEW_DATA } from '../../../graphql/queries'
import { useAccount } from '../../../hooks/auth'
import { FaEllipsisV } from 'react-icons/fa'
import ListLink from '../../../components/General/ListItems/ListLink'

import './Overview.less'
import { MESSAGES } from '../../../utilities/constants'

export default function Home() {
    const account = useAccount()
    const [linksData, setLinksData] = useState([])
    //const [errorOccured, setErrorOccurred] = useState(false)
    const [totalLinksCounter, setTotalLinksCounter] = useState(0)
    const [totalClicksCounter, setTotalClicksCounter] = useState(0)

    const {loading, error, data} = useQuery(GET_USER_OVERVIEW_DATA, {
        variables:{
            id: account.user.id,
            page: 1,
            pageSize: 5
        },
        fetchPolicy: 'cache-and-network'
    })
    useEffect(() => {
        if(!loading && !error){
            setLinksData(data.getUserLinks.links)
            setTotalLinksCounter(data.totalLinks)
            setTotalClicksCounter(data.totalClicks)
        }else if(error){
            if(error.networkError){
                alert.error(MESSAGES.NETWORK_ERROR)
            }else if(error.graphQLErrors){
                alert.error(MESSAGES.FETCH_FAILED)
            }
            //setErrorOccurred(true)
        }
        // return () => {}
    }, [loading,error, data])
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
                                {
                                loading ?
                                <Spin/>: totalLinksCounter
                                }
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
                                 {
                                loading ?
                                <Spin/>: totalClicksCounter
                                }
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
                        {

                            loading ?

                                <Spin tip="Loading Links"/>

                            :
                            linksData.length > 0 ?
                                linksData.map(item => {
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
