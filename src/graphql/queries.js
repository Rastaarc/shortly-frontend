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

export const CREATE_PREMIUM_LINK = gql`
        mutation CreatePremiumLink($oLink: String!, $keyword: String!){
            createPremiumLink(userInput: {link: $oLink, keyword: $keyword}){
                link{
                    shortLink
                }
                message
                ok
            }
        }
`
export const DELETE_LINK = gql`
    mutation deleteLink($link: Int!){
        deleteLink(linkId: $link){
            status,
            message
        }
    }
`


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





export const GET_USER_LINKS = gql`
        query GetUserLinks($id: Int!){
            getUserLinks(userId: $id){
                ...on LinksObject{
                    id
                    createdAt
                    shortLink
                    originalLink
                }
                ...on ErrorObject{
                    message
                    code
                }
            }
        }
`
export const GET_PAGINATED_USER_LINKS =gql`
        query GetFullLinks($id: Int!, $page: Int, $pageSize: Int, $search: String){
            getUserLinks(userId: $id, page: $page, perPage: $pageSize, search: $search){
                ...on PaginatedLinksObject{
                    page
                    perPage
                    total
                    links{
                        id
                        createdAt
                        shortLink
                        originalLink
                    }
                }
                ...on ErrorObject{
                    message
                    code
                }
            }
        }

`

export const GET_USER_OVERVIEW_DATA =gql`
        query GetOverviewData($id: Int!, $pageSize: Int){
            getUserLinks(userId: $id, perPage: $pageSize){
                ...on PaginatedLinksObject{
                    links{
                        id
                        createdAt
                        shortLink
                        originalLink
                    }
                }
                ...on ErrorObject{
                    message
                    code
                }
            }
            totalLinks(userId: $id)
            totalClicks(userId: $id)
        }

`