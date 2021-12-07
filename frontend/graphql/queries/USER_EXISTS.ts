import gql from "graphql-tag";

export const USER_EXISTS = gql`
  query USER_EXISTS($username: String!) {
    userExists(username: $username)
  }
`;
