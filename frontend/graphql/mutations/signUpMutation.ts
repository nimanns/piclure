import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $lastname: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      firstname: $name
      lastname: $lastname
      email: $email
      username: $username
      password: $password
    ) {
      user {
        id
        username
      }
    }
  }
`;
