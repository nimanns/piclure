import LoginPanel from "../components/LoginPanel";
import { GET_USER_QUERY, serverSideGetUser } from "../libs/useUser";
import dynamic from "next/dynamic";
import ClientOnly from "../components/ClientOnly";
import { MainDiv } from "../components/styled-components/StyledComponents";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Head from "next/head";
export default function LoginPage({ query }) {
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <MainDiv>
        <ClientOnly>
          <LoginPanel next={query}></LoginPanel>
        </ClientOnly>
      </MainDiv>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { query, req } = ctx;
    const response = await (
      await fetch("http://localhost:7777/api/fetchUser", {
        headers: {
          cookie: req.headers.cookie,
        },
      })
    ).json();
    console.log(response);
    const { getUser } = response;
    console.log(getUser);
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
  } catch (e) {
    return { props: {} };
  }
};
