//import { useEffect } from 'react'
import { useAuth } from '../../components/hooks/auth'
import usePageTitle from '../../components/hooks/title'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import './Dashboad.less'

function Dashboard() {
    usePageTitle("Dashboard")
    const auth = useAuth()
    console.log(auth);
    return (
        <DashboardLayout>
            Dashboard<br/><br />
            {/* {JSON.stringify(auth)} */}
        </DashboardLayout>
    )
}

export default Dashboard
