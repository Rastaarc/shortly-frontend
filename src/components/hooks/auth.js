import { useEffect, useState } from "react"
export const useAuth = ()=>{
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("account")))

    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("account")))
    },[])
    return auth
}

export const useUserLoggedIn = ()=>{
    const auth = useAuth()
    const [userLoggedIn, setUserLoggedIn] = useState(()=>{
        return auth ? true : false
    })

    useEffect(() => {
        if(auth){
            setUserLoggedIn(true)
        }else{
            setUserLoggedIn(false)
        }
        return () => {
        }
    }, [auth])

    return userLoggedIn
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
