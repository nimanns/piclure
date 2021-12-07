/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.


// ====================================================
// GraphQL mutation operation: LOGOUT_MUTATION
// ====================================================


export interface LOGOUT_MUTATION_deleteTokenCookie {
  __typename: "DeleteJSONWebTokenCookie";
  deleted: boolean;
}

export interface LOGOUT_MUTATION {
  deleteTokenCookie: LOGOUT_MUTATION_deleteTokenCookie | null;
}
