import {gql} from "@apollo/client";

export const GET_GYM_BY_ID = gql(`
    query getGymById($gym_id: ID!) {
      getGymById (id: $gym_id){
        id
        title
        address
        capacity
        schedule
      }
    }
`)