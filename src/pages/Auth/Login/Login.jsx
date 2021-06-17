import React from 'react'
import AuthLayout from '../../../components/Layouts/Auth/AuthLayout'
import './Login.less'


export default function Login() {
    return (
        <div>
           <AuthLayout>
               <div className="login__wrapper">
                   <div>
                       Login Page
                   </div>
               </div>
           </AuthLayout>
        </div>
    )
}
