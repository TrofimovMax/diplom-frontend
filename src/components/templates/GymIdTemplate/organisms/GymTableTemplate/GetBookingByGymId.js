import {gql} from "@apollo/client";

export const GET_BOOKING_BY_GYM_ID = gql(`
    query getBookingByGymId($gym_id: ID!){
      getBookingByGymId (gymId: $gym_id){
        id
        startAt
        endAt
        gymId
      }
    }
`)