import {gql} from "@apollo/client";

export const WISHING_ITEM = gql(`
    fragment WishingItem on WishingType {
     id
     startAt
     endAt
     gymId
     }
`)

export const CREATE_WISHING = gql(`
    mutation createWishingMutation ($startAt: ISO8601DateTime!, 
                                    $endAt: ISO8601DateTime!, 
                                    $userId: ID!, 
                                    $gymId: ID!) {
      createWishingMutation(input: {
        attributes: {
          startAt: $startAt
          endAt: $endAt
          gymId: $gymId
          userId: $userId
        }
      })
        {
        wishing {
          id
          startAt
          endAt
          gymId
        }
      }
    }
`)