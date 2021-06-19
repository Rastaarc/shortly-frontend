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
