/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: LOGIN_MUTATION
// ====================================================


export interface LOGIN_MUTATION_tokenAuth {
  __typename: "ObtainJSONWebToken";
  token: string;
  payload: any;
}

export interface LOGIN_MUTATION {
  /**
   * Obtain JSON Web Token mutation
   */
  tokenAuth: LOGIN_MUTATION_tokenAuth | null;
}

export interface LOGIN_MUTATIONVariables {
  username: string;
  password: string;
}
