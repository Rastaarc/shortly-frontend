import React, {useState, useEffect} from 'react'
import { useScreenType } from '../../../hooks/windowSize'
import { useMutation, useQuery } from '@apollo/client'
import { MESSAGES } from '../../../utilities/constants'
import { message as alert, Modal } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { ITEMS_PER_PAGE, SCREEN_TYPES } from '../../../utilities/constants'
import { GET_PAGINATED_ADMIN_LINKS, DELETE_LINK, UPDATE_LINK } from '../../../graphql/queries'
import DataTable from '../../../components/General/DataTable/DataTable'
import UpdateModal from '../../../components/General/Modal/UpdateModal/UpdateModal'
import dateformat from 'dateformat'

const { confirm } = Modal

function LinksAdmin() {

    const st = useScreenType()
    const DataTableColumns = [
    {
        title: 'Original Link',
        dataIndex: 'originalLink',
        key: 'oLink',
        width: '30%',
        ellipsis: true,
        tooltips: true,
        responsive: ['md'],
        //className: 'text--center',
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Short Link',
        dataIndex: 'shortLink',
        key: 'sLink',
        width: st >= SCREEN_TYPES.MOBILE_LARGE ? '' : '30%',
        ellipsis: true,
        //className: 'text--center',
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        align: 'center',
        // width: '20%',
        key: 'createdAt',
        responsive: ['md']
    },
    {
        title: 'Actions',
        key: 'actions',
        // width: '20%',
        render: (txt, record)=> {
            return (
            <div className="datatable__actions">
                <a href="#i" onClick={(e)=>doAction(e, 'showEditModal', record)}>Edit</a>
                <a href="#i" onClick={(e)=>doAction(e,'delete', record)}>Delete</a>
            </div>
        )}

    }
    ]

    const {data, loading, error, refetch,} = useQuery(GET_PAGINATED_ADMIN_LINKS,
        {fetchPolicy: 'cache-and-network', notifyOnNetworkStatusChange: true,})
    
    const [deleteLink, {loading: deleteLoading, error: deleteError, data: deleteData}] = useMutation(DELETE_LINK)
    const [updateLink, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(UPDATE_LINK)


    const [pagination, setPagination] = useState({current: 1, pageSize: ITEMS_PER_PAGE, total: 0})
    
    const [dataSource, setDataSource] = useState([])
    const [loadingData, setLoadingData] = useState(false)

    const [editData, setEditData] = useState({})
    const [editModalState, setEditModalState] = useState(false)


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
            case 'showEditModal':
                setEditData(record)
                setEditModalState(true)
                break;

                case 'delete':
                    confirm({
                        title: "Delete Link",
                        content: "Are you sure you want to delete this Link?",
                        icon: <ExclamationCircleOutlined/>,
                        onOk(){
                            deleteLink({
                                variables: {
                                    link: record.id
                                }
                            })
                        },


                    })
                break;

            default:
                return new Error('Invalid Operation')
        }
    }

    const doEdit = (data, type)=>{
        switch(type){
            case 'update':
                updateLink(
                    {
                        variables:{
                            linkId: data.id,
                            oLink: data.originalLink,
                            keyword: data.keyword
                        }
                    }
                )
                break;

            case 'close':
                setEditModalState(false)
                break;

            default:
                return
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
                const {getAllLinks} = data
                if(getAllLinks.code){
                    alert.error(getAllLinks.message)
                }else if(getAllLinks.links.length > 0){
                        setDataSource(getAllLinks.links.map(item=> (
                            {
                                ...item,
                                key: item.id,
                                createdAt: dateformat(new Date(item.createdAt), 'mediumDate'),
                                expand: [
                                    {
                                        title: 'Original Link',
                                        txt: <a href={item.originalLink} target="_blank" rel="noreferrer">{item.originalLink}</a>
                                    },
                                    {
                                        title: 'Short Link',
                                        txt: <a href={item.shortLink} target="_blank" rel="noreferrer">{item.shortLink}</a>//item.shortLink
                                    },
                                    {
                                        title: 'Created At',
                                        txt: dateformat(new Date(item.createdAt), 'fullDate'),
                                    },
                                    {
                                        title: 'Created By',
                                        txt: item.createdBy.username
                                    },
                                    {
                                        title: 'User Email',
                                        txt: item.createdBy.email
                                    },
                                ]
                            }
                            )))
                        setPagination(prevState =>({
                                    ...prevState,
                                    current: getAllLinks.page,
                                    pageSize: getAllLinks.perPage,
                                    total: getAllLinks.total
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
                const {deleteLink : {status, message}} = deleteData
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

    useEffect(()=>{
            if(updateData){
                const {updateLink : {ok, message}} = updateData
                if(ok){
                    alert.success(message)

                    refetch({page: pagination.current})
                    setEditModalState(false)
                }else{
                    alert.error(message)
                }
            }
            if(updateError){
                alert.error(MESSAGES.UPDATE_FAILED)
            }
    },[pagination, refetch, updateData, updateError])

    return (
        <>
            <h3 className="header__title">
                Links Management
            </h3>
             <div className="links__datatable">
                {/* <div className="header">
                    <h3 className="header__title">Links</h3>
                </div> */}

                <div className="card">
                    <DataTable
                        title="Links"
                        column={DataTableColumns}
                        data={dataSource}
                        loading={loadingData}
                        handler={handleTableChange}
                        searchHandler={handleSearch}
                        pagination={pagination}
                    />
                    <UpdateModal
                        data={editData}
                        showModal={editModalState}
                        loading={updateLoading}
                        submitHandler={(data, type)=>doEdit(data, type)}
                    />
                </div>
            </div>
        </>
    )
}

export default LinksAdmin
