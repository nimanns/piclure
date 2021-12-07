import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { Head } from "../../components/Head";
import MainPage from "../../components/MainPage";
import { MainDiv } from "../../components/styled-components/StyledComponents";
import Loading from "../../components/Loading";
import ErrorDisplay from "../../components/Error";
import { initializeApollo } from "../../libs/apollo";
import { GET_POSTS_QUERY } from "../../graphql/queries/GET_POSTS_QUERY";
import styled from "styled-components";

const TestDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 999;
  backdrop-filter: blur(0.4em);
`;

function checkPid(pid) {
  return +pid <= 0 || isNaN(+pid);
}

export default function IndexPaginated({ pid, user, err }) {
  if (err)
    return (
      <MainDiv>
        <ErrorDisplay message={err}></ErrorDisplay>
      </MainDiv>
    );

  if (checkPid(pid)) {
    return null;
  }

  return (
    <>
      <MainDiv>
        <MainPage pagination={pid} user={user}></MainPage>
      </MainDiv>
    </>
  );
}

export async function getServerSideProps({ query, req }) {
  try {
    const { pid } = query;
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: GET_POSTS_QUERY,
      variables: {
        pagination: pid === 0 ? pid : (pid - 1) * 6,
      },
    });
    if (checkPid(pid)) {
      return {
        redirect: {
          permanent: false,
          destination: "/posts/1",
        },
        props: { initialApolloState: apolloClient.cache.extract() },
      };
    } else {
      return {
        props: { pid, 
          initialApolloState: apolloClient.cache.extract() 
        },
      };
    }
  } catch (e) {
    return {
      props: { err: e.message },
    };
  }
}
