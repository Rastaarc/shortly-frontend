import {  ApolloClient, InMemoryCache } from '@apollo/client'

import { APP_NAME } from '../utilities/constants'

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT || 'http://127.0.0.1:5000/graphql-api/',
    cache: new InMemoryCache(),

    name: `${APP_NAME}'s frontend app`
})

export default client