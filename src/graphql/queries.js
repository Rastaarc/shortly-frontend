import { gql } from '@apollo/client'

export const CREATE_FREE_LINK = gql`
        mutation CreateFreeLink($theLink: String!){
            createFreemiumLink(originalLink: $theLink){
                link{
                    id
                    originalLink
                    shortLink
                    createdAt
                    createdBy{
                        id
                        username
                        joinDate
                    }
                }
                ok
                message
            }
        }
`;

export const CREATE_ACCOUNT = gql`
        mutation CreateAccount($username: String!, $email: String!, $password: String!){
            createAccount(accountData: {username: $username, email: $email, password: $password}){
                ok
                message
            }
        }
`;

export const LOGIN_ACCOUNT = gql`
        mutation LoginAccount($emailOrUsername: String!, $password: String!){
            loginAccount(usernameOrEmail: $emailOrUsername, password: $password){
                token
                user{
                    id
                    username
                    email
                    joinDate
                    userType

                }
                loggedIn
                message
            }
        }
`