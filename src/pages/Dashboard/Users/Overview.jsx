import React from 'react'
import usePageTitle from '../../../components/hooks/title'
import './Overview.less'



export default function Home() {
    usePageTitle("Dashboard")
    return (
        <div>
            Overview User
        </div>
    )
}
