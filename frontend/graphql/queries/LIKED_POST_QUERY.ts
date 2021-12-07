import gql from "graphql-tag";

export const LIKED_POST_QUERY = gql`
  query LIKED_POST_QUERY($id: ID!) {
    userLiked(id: $id)
  }
`;
