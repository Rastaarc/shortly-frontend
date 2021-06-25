import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAccount, useAuth } from '../../hooks/auth'
import usePageTitle from '../../hooks/title'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import { USERTYPES } from '../../utilities/constants'


function Users() {
    useAuth()
    usePageTitle('Users')
    const {user: {userType}} = useAccount()
    return (USERTYPES.ADMIN === userType) ? (
        <DashboardLayout>
                Users Admin
        </DashboardLayout>
    ) : <Redirect to="/dashboard"/>
}

export default Users
