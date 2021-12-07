/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: SIGNUP_MUTATION
// ====================================================


export interface SIGNUP_MUTATION_createUser_user {
  __typename: "UploaderType";
  id: string;
  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}

export interface SIGNUP_MUTATION_createUser {
  __typename: "CreateUser";
  user: SIGNUP_MUTATION_createUser_user | null;
}

export interface SIGNUP_MUTATION {
  createUser: SIGNUP_MUTATION_createUser | null;
}

export interface SIGNUP_MUTATIONVariables {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}
