import gql from "graphql-tag";

export const GET_POSTS_QUERY = gql`
  query GET_POSTS_QUERY($pagination: Int!) {
    getPosts(limit: 6, offset: $pagination) {
      totalCount
      results {
        id
        title
        dateTime
        description
        likes
        __typename
        relatedImages {
          image
        }
        uploader {
          username
        }
      }
    }
  }
`;