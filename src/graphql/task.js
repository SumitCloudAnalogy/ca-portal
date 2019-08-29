import gql from "graphql-tag";

export const INSERT_TASK = gql`
    mutation insertTask(
        $id: uuid!,
        $description: String!,
        $title: String!,
        $status: String!,
        $assigned_to: uuid!
    ){
        insert_task(objects: {owner_id: $id, description: $description, title: $title, status: $status, assigned_to: $assigned_to}) {
            returning {
                assigned_to
                created_at
                description
                due_date
                id
                owner_id
                started_date
                status
                title
                updated_at
            }
        }
    }

`;

export const GET_ALL_TASK = gql`
     query getAllTask ($id: uuid!){
        task(where: { owner_id: { _eq: $id } }) {
            id
            description
            title
            assigned_to
            status
            created_at
        }
      }
`;
