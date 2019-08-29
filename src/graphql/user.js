import gql from "graphql-tag";

export const  REGISTER =  gql`
    mutation register(
        $email: String!,
        $name: String!,
        $password: String!){
        insert_users (
            objects: [{
                name: $email,
                email: $name,
                password: $password,}]
        ) {
            affected_rows,
            returning{
                id
            }
        }
    }
`;
export const HELLO = gql`
    query {
        hello
    }
    `
