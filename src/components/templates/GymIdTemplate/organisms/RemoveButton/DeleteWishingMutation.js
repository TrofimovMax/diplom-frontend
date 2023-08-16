import {gql} from "@apollo/client";

export const DELETE_WISHING_MUTATION = gql(`
    mutation deleteWishingMutation($id: ID!) {
      deleteWishingMutation(input: {
        id: $id
      })
    {
      wishing{
        id
        gymId
        userId
        startAt
        endAt
      }
    }
  }
`)
