import {gql} from "@apollo/client";

export const DELETE_BOOKING_MUTATION = gql(`
    mutation deleteBookingMutation($id: ID!) {
      deleteBookingMutation(input: {
        id: $id
      })
    {
      booking{
        id
        gymId
        userId
        startAt
        endAt
      }
    }
  }
`)
