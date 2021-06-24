import { useEffect, useState } from "react"
export const useAccount = ()=>{
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem("account")))

    useEffect(()=>{
        setAccount(JSON.parse(localStorage.getItem("account")))
    },[])
    return account
}

export const useUserLoggedIn = ()=>{
    const account = useAccount()
    const [userLoggedIn, setUserLoggedIn] = useState(()=>{
        return account ? true : false
    })

    useEffect(() => {
        if(account){
            setUserLoggedIn(true)
        }else{
            setUserLoggedIn(false)
        }
        return () => {
        }
    }, [account])

    return [userLoggedIn, setUserLoggedIn]
}

export const useAuth = () =>{
    const [userLoggedIn] = useUserLoggedIn()
    if(!userLoggedIn){
        window.location.replace('/login')
    }
}




export const logoutAccount = ()=> {
    try{
        localStorage.removeItem("account")
        return true
    }catch(e){
        console.log(e.message)
        return false
    }
}
