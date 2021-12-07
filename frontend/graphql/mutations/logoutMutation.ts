import gql from "graphql-tag";

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    deleteTokenCookie {
      deleted
    }
  }
`;
