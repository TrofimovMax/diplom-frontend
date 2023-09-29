import { gql } from "@apollo/client";

export const INTAKE_TAG_UPDATE_MUTATION = gql`
    mutation IntakeTagsUpdate ($name: String) {
        intakeTagsUpdate(id: 1, attributes: {
            name: $name,
            type: system,
            intake_tag_attributes_attributes: [
                {
                    id: 1,
                    type: organizations
                    data: { value: [1] }
                }
            ]
        }) {
            intake_tag {
                id
                name
                intake_tag_attributes {
                    id
                    data
                    type
                }
            }
            errors {
                key
                messages
            }
        }
    }
`;