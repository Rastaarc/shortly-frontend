import {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client'
import { FaLink, FaTachometerAlt } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { GET_USER_LINKS } from '../../../graphql/queries'
import { useAccount } from '../../../hooks/auth'
import './Overview.less'


const loadErrorMessage = "Failed to load the data. Please try again"
export default function Home() {
    const account = useAccount()
    const [linksData, setLinksData] = useState([])
    const [errorOccured, setErrorOccurred] = useState(false)

    const {loading, error, data} = useQuery(GET_USER_LINKS, {
        variables:{
            id: account.user.id
        }
    })
    useEffect(() => {
        if(!loading && !error){
            if(data.getUserLinks){
                setLinksData(data.getUserLinks)
            }
        }else if(error){
            console.log(error.graphQLErrors)
            console.log(error.networkError)
            setErrorOccurred(true)
        }
        return () => {}
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
                        {

                            loading ?

                                "Loading"

                            :
                            errorOccured ?
                                loadErrorMessage
                            :

                                    linksData.map(l=>
                                    {
                                        return (<div className="links" key={l.id}><div className="link">
                                            <a href={l.shortLink} target="_blank" rel="noreferrer">
                                                {l.shortLink}
                                            </a>
                                            <span>{l.originalLink}</span>
                                            </div>

                                        </div>
                                        )
                                    })
                        }
                    </div>
                    <div className="card">
                        <h5 className="title">Subscriptions</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
