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
                user {
                    id
                    username
                    email
                    joinDate
                }
                ok
                message
            }
        }
`;