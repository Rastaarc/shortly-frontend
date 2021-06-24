import React from 'react'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import LinksAdmin from './Admin/LinksAdmin'
import LinksUser from './User/LinksUser'
import { USERTYPES } from '../../utilities/constants'
import { useAuth } from '../../components/hooks/auth'

function Links() {
    const {user: {userType}} = useAuth()
    return (
        <DashboardLayout>
            {(userType === USERTYPES.ADMIN)? <LinksAdmin/> : <LinksUser/>}
        </DashboardLayout>
    )
}

export default Links
