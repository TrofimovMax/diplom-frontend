import {gql} from "@apollo/client";


export const FETCH_INTAKE_TAGS = gql(`
    query Intake_tags {
    intake_tags(order: name) {
        nodes {
            color
            created_at
            created_at_iso
            description
            id
            intake_queues_count
            name
            status
            tickets_count
            updated_at
            updated_at_iso
            created_by {
                id
                email
            }
            intake_tag_attributes {
                created_at
                created_at_iso
                data
                id
                operator
                type
                updated_at
                updated_at_iso
            }
        }
    }
}
`)