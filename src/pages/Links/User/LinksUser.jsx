import React, {useEffect, useState, useRef} from 'react'
import { Button, message as alert } from 'antd'
import client from '../../../graphql/client'
import './LinksUser.less'
import { CREATE_PREMIUM_LINK } from '../../../graphql/queries'

function LinksUser() {
    const [originalLink, setOriginalLink] = useState('')
    const [linkKeyword, setLinkKeyword] = useState('')
    const [shortenBtnText, setShortenBtnText] = useState('Shorten It')
    const [processingForm, setProcessingForm] = useState(false)
    const [canCopyLink, setCanCopyLink] = useState(false)

    const originalLinkRef = useRef()

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
        <div>
            <h2 className="header__title">
                Links
            </h2>
            <div className="new__link">
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
                            maxLength="20"
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
        </div>
    )
}

export default LinksUser
