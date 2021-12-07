import gql from "graphql-tag";

export const LIKE_POST_MUTATION = gql`
  mutation LIKE_POST_MUTATION ($postId:ID!,$liked:Boolean!){
    likePost(postId:$postId,liked:$liked){
      post{
        likes
      }
    }
  }
`;