import {gql} from "@apollo/client";

export const BOOKING_ITEM = gql(`
    fragment BookingItem on BookingType {
     id
     startAt
     endAt
     gymId
     }
`)

export const CREATE_BOOKING = gql(`
    mutation createBookingMutation ($startAt: ISO8601DateTime!, 
                                    $endAt: ISO8601DateTime!, 
                                    $userId: Int!, 
                                    $gymId: Int!) {
      createBookingMutation(input: {
        startAt: $startAt
        endAt: $endAt
        gymId: $gymId
        userId: $userId
      })
        {
        booking {
          id
          startAt
          endAt
          gymId
        }
      }
    }
`)