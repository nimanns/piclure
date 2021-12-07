import { QueryHookOptions, useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  ApolloLink,
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { endpoint, prodEndpoint } from "../config";
import { NextPageContext } from "next";

export const GET_USER_QUERY = gql`
  query GET_USER_QUERY {
    getUser {
      username
      firstName
      lastName
      groups
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation REFRESH_TOKEN_MUTATION {
    refreshToken {
      payload
    }
  }
`;

export function getUser(options: QueryHookOptions = {}) {
  const { data, loading, error } = useQuery(GET_USER_QUERY, options);
  if (loading) return { loading: true };
  if (error) {
    return { getUser: null };
  }
  if (data) return data;
}

export async function refreshToken() {
  try {
    const [refreshToken, { data, error }] = useMutation(REFRESH_TOKEN_MUTATION);
    const res = await refreshToken();
    console.log(data);
    console.log(error);
  } catch (e) {
    console.log(e);
  }
}

export async function serverSideGetUser(ctx: NextPageContext) {
  try {
    const { req, res } = ctx;
    if (req.headers.cookie.includes("JWT")) {
      const link = ApolloLink.from([
        createHttpLink({
          uri: endpoint,
          credentials: "include",
          headers: { cookie: req.headers.cookie },
        }),
      ]);

      const client = new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: true,
        link,
      });

      const { data, error } = await client.query({ query: GET_USER_QUERY });

      const { getUser } = data;
      if (getUser) {
        return {
          redirect: {
            permanent: false,
            destination: "/posts/1",
          },
          props: {},
        };
      } else {
        return { props: {} };
      }
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}

export async function serverSideAdminApproval(ctx: NextPageContext) {
  try {
    const { req } = ctx;
      console.log(req.headers);
    if (req.headers.cookie.includes("JWT")) {
      const link = ApolloLink.from([
        createHttpLink({
          uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
          credentials: "include",
          headers: { cookie: req.headers.cookie },
        }),
      ]);
      const client = new ApolloClient({
        cache: new InMemoryCache(),
        ssrMode: true,
        link,
      });

      const { data } = await client.query({
        query: GET_USER_QUERY,
        fetchPolicy: "no-cache",
      });
      const { getUser } = data;
      console.log(getUser);
      if (!getUser || getUser.groups !== "Admins") {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {},
        };
      } else {
        return { props: {} };
      }
    } else {

      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
        props: {},
      };
    }
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}
