//import { useEffect } from 'react'
import { useAuth } from '../../components/hooks/auth'
import usePageTitle from '../../components/hooks/title'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import Overview from './Users/Overview'
import OverviewAdmin from './Admin/OverviewAdmin'
import { USERTYPES } from '../../utilities/constants'


import './Dashboad.less'

function Dashboard() {
    usePageTitle("Dashboard")
    const {user: {userType }} = useAuth()
    return (
        <DashboardLayout>
            {(userType === USERTYPES.ADMIN) ? <OverviewAdmin/> : <Overview/>}
        </DashboardLayout>
    )
}

export default Dashboard
