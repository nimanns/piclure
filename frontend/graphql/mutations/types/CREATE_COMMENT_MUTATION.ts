/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: CREATE_COMMENT_MUTATION
// ====================================================


export interface CREATE_COMMENT_MUTATION_createComment_comment_publisher {
  __typename: "UploaderType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface CREATE_COMMENT_MUTATION_createComment_comment {
  __typename: "CommentType";
  id: string;
  comment: string;
  dateTime: any;
  publisher: CREATE_COMMENT_MUTATION_createComment_comment_publisher;
}

export interface CREATE_COMMENT_MUTATION_createComment {
  __typename: "CreateComment";
  comment: CREATE_COMMENT_MUTATION_createComment_comment | null;
}

export interface CREATE_COMMENT_MUTATION {
  createComment: CREATE_COMMENT_MUTATION_createComment | null;
}

export interface CREATE_COMMENT_MUTATIONVariables {
  postId: string;
  content: string;
}
