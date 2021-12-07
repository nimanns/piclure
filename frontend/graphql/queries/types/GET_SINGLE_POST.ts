/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GET_SINGLE_POST
// ====================================================


export interface GET_SINGLE_POST_getPostById_uploader {
  __typename: "UploaderType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface GET_SINGLE_POST_getPostById_relatedImages {
  __typename: "ImageType";
  id: string;
  image: string;
}

export interface GET_SINGLE_POST_getPostById_comments_publisher {
  __typename: "UploaderType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface GET_SINGLE_POST_getPostById_comments {
  __typename: "CommentType";
  id: string;
  comment: string;
  dateTime: any;
  publisher: GET_SINGLE_POST_getPostById_comments_publisher;
}

export interface GET_SINGLE_POST_getPostById {
  __typename: "PostType";
  id: string;
  title: string;
  description: string;
  uploader: GET_SINGLE_POST_getPostById_uploader | null;
  dateTime: any;
  relatedImages: (GET_SINGLE_POST_getPostById_relatedImages | null)[] | null;
  comments: (GET_SINGLE_POST_getPostById_comments | null)[] | null;
}

export interface GET_SINGLE_POST {
  getPostById: GET_SINGLE_POST_getPostById | null;
}

export interface GET_SINGLE_POSTVariables {
  id: string;
}
