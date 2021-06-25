import {  ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { APP_NAME } from '../utilities/constants'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_ENDPOINT || 'http://127.0.0.1:5000/graphql-api/',
})

const authLink = setContext((_,{ headers })=>{
    const account = JSON.parse(localStorage.getItem("account"))
    let token = ""
    if(account){
        token = `Bearer ${account.token}`
    }
    return {
        headers: {
            ...headers,
            authorization: token,
        }
    }
})
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    name: `${APP_NAME}'s frontend app`
})

export default client