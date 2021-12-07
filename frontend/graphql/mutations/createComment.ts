import gql from "graphql-tag";

export const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($postId: ID!, $content: String!) {
    createComment(content: $content, postId: $postId) {
      comment {
        id
        comment
        dateTime
        publisher {
          username
        }
      }
    }
  }
`;
