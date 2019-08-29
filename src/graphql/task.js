import gql from "graphql-tag";

export const GET_ALL_Holidays = gql`
    query getAllOrgainsations($id: uuid!) {
        holiday(where: { owner_id: { _eq: $id } }) {
            id
            name
            created_at
            image_url
            owner_id
            reference_url
            updated_at
            date
        }
    }
`;
