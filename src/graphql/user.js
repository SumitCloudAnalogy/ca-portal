import gql from "graphql-tag";

export const REGISTER = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(data: { name: $name, email: $email, password: $password })
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user_id
    }
  }
`;

export const USER_SUBSCRIPTION = gql`
  subscription subscribeToUser($id: uuid!) {
    user(where: { id: { _eq: $id } }, limit: 1) {
      id
      name
      email
      avatar_url
      mobile
      admin
      phone
      designation
      addresses {
        id
        state
        street
        type
        city
        country
        zip
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateProfile($id: uuid!, $record: user_set_input!) {
    update_user(_set: $record, where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const USER_DETAILS = gql`
  query getUserDetails($id: uuid!){
    user(where: {id: {_eq: $id}}, limit: 1) {
      id
      name
      email
      avatar_url
      mobile
      admin
      phone
      designation
      bio
      created_at
      date_of_birth
      date_of_joining
      date_of_leaving
      gender
      active
      addresses {
        id
        state
        street
        type
        city
        country
        zip
      }
      tasks {
        status
        started_date
        owner_id
        id
        due_date
        description
        created_at
        completed_date
        title
        assigned_to
      }
      organisations {
        name
        owner_id
        logo_url
        id
        banner_url
        website_url
      }
      attendances {
        id
        owner_id
        end
        start
        created_at
        updated_at
      }
    }
  }
`;
export const All_USERS = gql`
  query getAllUsers {
    user(where: {admin: {_eq: false}}) {
      id
      active
      admin
      mobile
      name
      phone
      gender
      email
      designation
      date_of_leaving
      date_of_joining
      date_of_birth
      created_at
      bio
      avatar_url
      addresses {
        id
        state
        street
        type
        city
        country
        zip
      }
    }
  }
`;
