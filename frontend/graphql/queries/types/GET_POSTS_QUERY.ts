/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL query operation: GET_POSTS_QUERY
// ====================================================


export interface GET_POSTS_QUERY_getPosts_results_relatedImages {
  __typename: "ImageType";
  image: string;
}

export interface GET_POSTS_QUERY_getPosts_results_uploader {
  __typename: "UploaderType";
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface GET_POSTS_QUERY_getPosts_results {
  __typename: "PostType";
  id: string;
  title: string;
  dateTime: any;
  description: string;
  likes: number;
  relatedImages: (GET_POSTS_QUERY_getPosts_results_relatedImages | null)[] | null;
  uploader: GET_POSTS_QUERY_getPosts_results_uploader | null;
}

export interface GET_POSTS_QUERY_getPosts {
  __typename: "PostTypeNodeConnection";
  totalCount: number | null;
  /**
   * Contains the nodes in this connection.
   */
  results: (GET_POSTS_QUERY_getPosts_results | null)[];
}

export interface GET_POSTS_QUERY {
  getPosts: GET_POSTS_QUERY_getPosts | null;
}

export interface GET_POSTS_QUERYVariables {
  pagination: number;
}
