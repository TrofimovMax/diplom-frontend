import { gql } from "@apollo/client";

export const UPDATE_GYM_MUTATION = gql`
  mutation updateGymMutation($id: ID!, $schedule: GymScheduleInput!) {
    updateGymScheduleMutation(input: {
      id: $id,
      schedule: $schedule
    }) {
      gym {
        id
        title
        address
        schedule
        capacity
        createdAt
        updatedAt
        ownerId
      }
    }
  }
`;