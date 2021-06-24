import React from 'react'
import SubscriptionsUser from './User/SubscriptionsUser'
import SubscriptionsAdmin from './Admin/SubscriptionsAdmin'
import { USERTYPES } from '../../utilities/constants'
import { useAuth } from '../../components/hooks/auth'



function Subscriptions() {
    const {user: {userType}} = useAuth()
    return (
        <div>
            {(userType === USERTYPES.ADMIN)? <SubscriptionsAdmin/> : <SubscriptionsUser/>}
        </div>
    )
}

export default Subscriptions
