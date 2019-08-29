import gql from "graphql-tag";

export const GET_ALL_ORGANISATIONS = gql`
  query getAllOrgainsations($id: uuid!) {
    organisation(where: { owner_id: { _eq: $id } }) {
      id
      name
      primary_email
      logo_url
      banner_url
      website_url
    }
  }
`;

export const GET_ORGANISATION_DETAILS = gql`
  query getOrganisationDetails($id: uuid!) {
    organisation(where: { id: { _eq: $id } }) {
      id
      banner_url
      logo_url
      name
      website_url
      organisation_users {
        user {
          id
          name
          email
        }
        admin
      }
    }
  }
`;
