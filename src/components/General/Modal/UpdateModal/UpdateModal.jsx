import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
function UpdateModal({data={}, showModal=false, submitHandler, loading=false}) {

    const [originalLink, setOriginalLink] = useState(()=> data.originalLink? data.originalLink : '')
    const [keyword, setKeyword] = useState(()=> data.shortLink? data.shortLink.split('/')[3] : '')

    useEffect(() => {
        setOriginalLink(()=> data.originalLink? data.originalLink : '')
        setKeyword(()=> data.shortLink? data.shortLink.split('/')[3] : '')

        return () => {}
    }, [data.originalLink, data.shortLink])
    const handleSubmit = (type)=>{

        const newData = {
            id: parseInt(data.id),
            originalLink,
            keyword
        }
        submitHandler(newData, type);
    }

    const disabled = ()=> {
        const validKeyword = (keyword.length >= 3 && keyword.length <= 30)
        const validUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/.test(originalLink)

        return (!validKeyword || !validUrl)
    }


    return (
        <>
            <Modal
                visible={showModal}
                title="Edit Link"
                destroyOnClose
                footer = {
                    [
                        <Button
                            disabled={disabled()}
                            loading={loading}
                            type="primary"
                            onClick={()=>handleSubmit('update')}>Update</Button>,
                        <Button onClick={()=>handleSubmit('close')}>Close</Button>
                    ]
                }
            >
                    <form>
                        <input type="url" placeholder="Original Link" value={originalLink} onChange={(e)=> setOriginalLink(e.target.value)} />
                        <input type="text" placeholder="Keyword" value={keyword} onChange={(e)=> setKeyword(e.target.value)}/>
                    </form>
            </Modal>
        </>
    )
}

export default UpdateModal
