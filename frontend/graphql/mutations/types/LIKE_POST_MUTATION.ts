/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: LIKE_POST_MUTATION
// ====================================================


export interface LIKE_POST_MUTATION_likePost_post {
  __typename: "PostType";
  likes: number;
}

export interface LIKE_POST_MUTATION_likePost {
  __typename: "LikePost";
  post: LIKE_POST_MUTATION_likePost_post | null;
}

export interface LIKE_POST_MUTATION {
  likePost: LIKE_POST_MUTATION_likePost | null;
}

export interface LIKE_POST_MUTATIONVariables {
  postId: string;
  liked: boolean;
}
