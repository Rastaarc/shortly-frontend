import React, {useEffect, useState, useRef} from 'react'
import { Button, message as alert, Modal } from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import DataTable from '../../../components/General/DataTable/DataTable'
import client from '../../../graphql/client'
import './LinksUser.less'
import { CREATE_PREMIUM_LINK, DELETE_LINK, GET_PAGINATED_USER_LINKS } from '../../../graphql/queries'
import { ITEMS_PER_PAGE } from '../../../utilities/constants'
import {useAccount} from '../../../hooks/auth'
import { useMutation, useQuery } from '@apollo/client'
import { MESSAGES } from '../../../utilities/constants'

const {confirm} = Modal
function LinksUser() {
    const DataTableColumns = [
    {
        title: 'Original Link',
        dataIndex: 'originalLink',
        key: 'oLink',
        width: '30%',
        ellipsis: true,
        tooltips: true,
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Short Link',
        dataIndex: 'shortLink',
        key: 'sLink',
        width: '30%',
        ellipsis: true,
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        align: 'center',
        // width: '20%',
        key: 'createdAt',
    },
    {
        title: 'Actions',
        key: 'actions',
        // width: '20%',
        render: (txt, record)=> {
            return (
            <div className="datatable__actions">
                <a href="#i" onClick={(e)=>doAction(e, 'edit', record)}>Edit</a>
                <a href="#i" onClick={(e)=>doAction(e,'delete', record)}>Delete</a>
            </div>
        )}

    }
    ]

    const userAccount = useAccount()

    const {data, loading, error, refetch,} = useQuery(
        GET_PAGINATED_USER_LINKS,
        {
            variables: {
                id: userAccount.user.id
            },
            fetchPolicy: 'cache-and-network',
            notifyOnNetworkStatusChange: true,
        }
    )
    const [deleteLink, {loading: deleteLoading, error: deleteError, data: deleteData}] = useMutation(DELETE_LINK)

    const [originalLink, setOriginalLink] = useState('')
    const [linkKeyword, setLinkKeyword] = useState('')
    const [shortenBtnText, setShortenBtnText] = useState('Shorten It')
    const [processingForm, setProcessingForm] = useState(false)
    const [canCopyLink, setCanCopyLink] = useState(false)

    const [dataSource, setDataSource] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: ITEMS_PER_PAGE,
        total: 0
    })
    const originalLinkRef = useRef()

    const handleTableChange = async (pagination, filters, sorter)=>{
        setLoadingData(true)
        await refetch({
            id: userAccount.user.id,
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
            id: userAccount.user.id,
            search: val.length > 0 ? val : null
        })
        setLoadingData(false)
    }

    const doAction = (e,type, record)=>{
        e.preventDefault()
        switch(type){
            case 'edit':
                console.log('Edit Item');
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

    useEffect(()=>{
        if(deleteData){
            const {deleteLink : {status, message}} = deleteData
            if(status === true){
                alert.success(message)
                refetch({id: userAccount.user.id, page: 1})
            }else{
                alert.error(message)
            }
        }
    },[deleteData, refetch, userAccount.user.id])

    useEffect(()=>{
        if(deleteLoading){
            setLoadingData(true)
        }else{
            if(loadingData) setLoadingData(false)
        }
    },[deleteLoading, loadingData])

    useEffect(()=>{
        if(deleteError) alert.error(deleteError.message)//alert.error(MESSAGES.DELETE_FAILED)
    },[deleteError])

    useEffect(()=>{
        if(loading){
            setLoadingData(true)
        }else{
            setLoadingData(false)
        }
    }, [loading])

    useEffect(()=>{
        if(data){
            const {getUserLinks} = data
            if(getUserLinks.code){
                alert.error(getUserLinks.message)
            }else if(getUserLinks.links.length > 0){
                    setDataSource(getUserLinks.links.map(item=> ({...item, key: item.id})))
                    setPagination(prevState =>({
                                ...prevState,
                                current: getUserLinks.page,
                                pageSize: getUserLinks.perPage,
                                total: getUserLinks.total
                            })
                        )
            }
        }
        
    },[data])
    
    useEffect(()=>{
        if(error){
            alert.error(MESSAGES.FETCH_FAILED)
        }
    }, [error])

    useEffect(()=>{
        if(originalLinkRef.current){
            originalLinkRef.current.focus()
        }
    },[originalLink])

    const shortenLink = (e)=>{
        e.preventDefault()
        if(shortenBtnText === 'Shorten It'){
            setProcessingForm(true)
            setShortenBtnText("Loading")

            client.mutate({
                mutation: CREATE_PREMIUM_LINK,
                variables:{
                    oLink: originalLink,
                    keyword: linkKeyword
                }
            }).then(result=>{
                setProcessingForm(false)

                const {data: {createPremiumLink: {link:{shortLink}, message, ok}}} = result
                if(ok){
                    refetch({id: userAccount.user.id, page: 1})

                    setCanCopyLink(true)
                    const shortenLinkHolder = document.getElementById("input__url")
                    shortenLinkHolder.value = shortLink
                    shortenLinkHolder.select(); //select the input value

                    setShortenBtnText('Copy')
                    setOriginalLink('')
                    setLinkKeyword('')

                    alert.success(message)

                }else{
                    alert.error(message)
                }

            }).catch(e=>{
                setProcessingForm(false)
                console.log(e);
                alert.error("Error Occurred while creating your link")
            })


        }else if(shortenBtnText === 'Copy'){
            document.execCommand('copy'); //copy to clipboard
            setCanCopyLink(false)
            setShortenBtnText('Shorten It')
        }else{
            alert.error("Can't perform your operation")
        }
    }


    return (
        <>
            <h3 className="header__title">
                Links Management
            </h3>
            <div className="new__link card">
                <form onSubmit={shortenLink}>
                    { !canCopyLink &&
                        <input
                            type="url"
                            placeholder="Original Link"
                            ref={originalLinkRef}
                            value={originalLink}
                            required
                            onChange={(e)=>setOriginalLink(e.target.value)}
                        />
                    }

                    { !canCopyLink &&
                        <input
                            type="text"
                            placeholder="Keyword"
                            minLength="3"
                            maxLength="30"
                            value={linkKeyword}
                            required
                            onChange={(e)=>setLinkKeyword(e.target.value)}
                        />
                    }
                    {
                        canCopyLink && <input type="url" id="input__url"/>
                    }
                    <Button 
                        loading={processingForm} 
                        type="primary"
                        htmlType="submit"
                    >
                            {shortenBtnText}
                    </Button>
                </form>
            </div>

            <div className="links__datatable">
                <div className="header">
                    {/* <h3 className="header__title">Links</h3> */}
                </div>
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
                </div>
            </div>
        </>
    )
}

export default LinksUser
