import React from 'react'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import LinksAdmin from './Admin/LinksAdmin'
import LinksUser from './User/LinksUser'
import { USERTYPES } from '../../utilities/constants'
import { useAccount, useAuth } from '../../hooks/auth'
import usePageTitle from '../../hooks/title'
import './Links.less'



function Links() {
    useAuth()
    const {user: {userType}} = useAccount()
    usePageTitle('Links')
    return (
        <DashboardLayout>
            {(userType === USERTYPES.ADMIN)? <LinksAdmin/> : <LinksUser/>}
        </DashboardLayout>
    )
}

export default Links
