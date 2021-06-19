import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'
import MainLayout from '../../../components/Layouts/Main/MainLayout'
import usePageTitle from '../../../components/hooks/title'
function PageNotFound() {
    usePageTitle("404")
    return (
        <MainLayout>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
            />
        </MainLayout>
    )
}

export default PageNotFound
