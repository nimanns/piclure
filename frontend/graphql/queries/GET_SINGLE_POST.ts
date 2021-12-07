import gql from "graphql-tag";

export const GET_SINGLE_POST = gql`
  query GET_SINGLE_POST($id: String!) {
    getPostById(id: $id) {
      id
      title
      description
      uploader {
        username
      }
      dateTime
      relatedImages {
        id
        image
      }
      comments{
        id
        comment
        dateTime
        publisher{
          username
        }
      }
    }
  }
`;
