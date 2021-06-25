import React from 'react'
import SubscriptionsUser from './User/SubscriptionsUser'
import SubscriptionsAdmin from './Admin/SubscriptionsAdmin'
import { USERTYPES } from '../../utilities/constants'
import { useAccount, useAuth } from '../../hooks/auth'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import usePageTitle from '../../hooks/title'



function Subscriptions() {
    useAuth()
    const {user: {userType}} = useAccount()
    usePageTitle("Subscriptions")
    return (
        <DashboardLayout>
            {(userType === USERTYPES.ADMIN)? <SubscriptionsAdmin/> : <SubscriptionsUser/>}
        </DashboardLayout>
    )
}

export default Subscriptions
