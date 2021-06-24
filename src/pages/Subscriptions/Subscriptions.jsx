import React from 'react'
import SubscriptionsUser from './User/SubscriptionsUser'
import SubscriptionsAdmin from './Admin/SubscriptionsAdmin'
import { USERTYPES } from '../../utilities/constants'
import { useAccount, useAuth } from '../../components/hooks/auth'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import usePageTitle from '../../components/hooks/title'



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
