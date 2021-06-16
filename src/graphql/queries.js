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
`