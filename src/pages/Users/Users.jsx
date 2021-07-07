import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAccount, useAuth } from '../../hooks/auth'
import usePageTitle from '../../hooks/title'
import DashboardLayout from '../../components/Layouts/Dashboard/DashboardLayout'
import { USERTYPES, ITEMS_PER_PAGE, MESSAGES } from '../../utilities/constants'
import { useMutation, useQuery } from '@apollo/client'
import { message as alert, Modal } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { DELETE_USER, GET_PAGINATED_ADMIN_USERS, } from '../../graphql/queries'
import DataTable from '../../components/General/DataTable/DataTable'
import dateformat from 'dateformat'

const {confirm} = Modal

function Users() {
    useAuth()
    usePageTitle('Users')
    const {user: {userType}} = useAccount()
    //const st = useScreenType()

    const DataTableColumns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: '25%',
        ellipsis: true,
        tooltips: true,
        //responsive: ['md'],
        //className: 'text--center',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        ellipsis: true,
        //responsive: ['md'],
        //className: 'text--center',
    },
    {
        title: 'Joined Date',
        dataIndex: 'joinDate',
        align: 'center',
        width: '22%',
        key: 'joinDate',
        responsive: ['md']
    },
    {
        title: 'Action',
        key: 'action',
        // width: '20%',
        render: (txt, record)=> {
            return (
            <div className="datatable__actions">
                <a href="#i" onClick={(e)=>doAction(e,'delete', record)}>Delete</a>
            </div>
        )}

    }
    ]
    const {data, loading, error, refetch,} = useQuery(GET_PAGINATED_ADMIN_USERS,
        {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true,})
    const [deleteUser, {loading: deleteLoading, error: deleteError, data: deleteData}] = useMutation(DELETE_USER)


    const [pagination, setPagination] = useState({current: 1, pageSize: ITEMS_PER_PAGE, total: 0})
    
    const [dataSource, setDataSource] = useState([])
    const [loadingData, setLoadingData] = useState(false)

    const handleTableChange = async (pagination, filters, sorter)=>{
        setLoadingData(true)
        await refetch({
            page: pagination.current,
            pageSize: pagination.pageSize,
        })
        setPagination(prevState => {
            return ({
                ...prevState,
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total
            })
        })
        setLoadingData(false)

    }

    const handleSearch = async (val)=>{
        setDataSource([])
        setLoadingData(true)
        await refetch({
            search: val.length > 0 ? val : null
        })
        setLoadingData(false)
    }

    const doAction = (e,type, record)=>{
        e.preventDefault()
        switch(type){
                case 'delete':
                    console.log(record);
                    confirm({
                        title: "Delete User",
                        content: "Are you sure you want to delete this User?",
                        icon: <ExclamationCircleOutlined/>,
                        onOk(){
                            deleteUser({variables: {id: parseInt(record.id)}})
                        },
                    })
                break;

            default:
                return new Error('Invalid Operation')
        }
    }

    useEffect(()=>{
        let canUpdate = true
        if(canUpdate){
            if(loading){
                setLoadingData(true)
            }else{
                setLoadingData(false)
            }
        }
        return ()=> canUpdate = false
    }, [loading])

    useEffect(()=>{
        let canUpdate = true
        if(canUpdate){
            if(error){
                alert.error(MESSAGES.FETCH_FAILED_ADMIN)
            }
        }
        return ()=> canUpdate = false
    }, [error])

    useEffect(()=>{
        if(data){
                const {getAllUsers} = data
                if(getAllUsers.code){
                    alert.error(getAllUsers.message)
                }else if(getAllUsers.users.length > 0){
                        setDataSource(getAllUsers.users.map(item=> (
                            {
                                ...item,
                                key: item.id,
                                joinDate: dateformat(new Date(item.joinDate), 'mediumDate'),
                                expand: [
                                    {
                                        title: 'Email',
                                        txt: item.email
                                    },
                                    {
                                        title: 'Joined Date',
                                        txt: dateformat(new Date(item.joinDate), 'fullDate')
                                    },
                                ]
                            }
                            )))
                        setPagination(prevState =>({
                                    ...prevState,
                                    current: getAllUsers.page,
                                    pageSize: getAllUsers.perPage,
                                    total: getAllUsers.total
                                })
                            )
                }
            }
    }, [data])

    useEffect(()=>{
        let canUpdate = true
        if(canUpdate){
            if(deleteError) alert.error(MESSAGES.DELETE_FAILED)
        }
        return ()=> canUpdate = false
    },[deleteError])

    useEffect(()=>{
        let canUpdate = true
        if(canUpdate){
            if(deleteLoading){
                setLoadingData(true)
            }else{
                setLoadingData(false)
            }
        }
        return ()=> canUpdate = false
    },[deleteLoading, loadingData])

    useEffect(()=>{
        let canUpdate = true

        if(canUpdate){
            if(deleteData){
                const {deleteUser : {status, message}} = deleteData
                if(status === true){
                    alert.success(message)
                    refetch({page: 1})
                }else{
                    alert.error(message)
                }
            }
        }
        return ()=> canUpdate = false
    },[deleteData, refetch])

    return (USERTYPES.ADMIN === userType) ? (
        <DashboardLayout>
            <h3 className="header__title">
                Users Management
            </h3>
            <div className="card" style={{marginTop: 20}}>
                <DataTable
                    title="Users"
                    column={DataTableColumns}
                    data={dataSource}
                    loading={loadingData}
                    handler={handleTableChange}
                    searchHandler={handleSearch}
                    pagination={pagination}
                />
            </div>
        </DashboardLayout>
    ) : <Redirect to="/dashboard"/>
}

export default Users
