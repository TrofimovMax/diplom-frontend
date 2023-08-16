import {gql} from "@apollo/client";

export const GET_WISHING_BY_GYM_ID = gql(`
    query getWishingByGymId($gym_id: ID!){
      getWishingByGymId (gymId: $gym_id){
        id
        startAt
        endAt
        gymId
        userId
      }
    }
`)