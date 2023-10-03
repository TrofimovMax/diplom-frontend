import {gql} from "@apollo/client";


export const FETCH_INTAKE_TAG_GYM = gql(`
    query FetchIntakeTag ($page: Int!, $limit: Int!) {
      fetchIntakeTags(page: $page, limit: $limit){
        id
        name
      }
    }
`)