import {gql} from "@apollo/client";


export const FETCH_GYMS = gql(`
    query {
    fetchGyms(page: 1, limit: 10) {
      id
      title
      address
      capacity
      ownerId
      }
    }
`)