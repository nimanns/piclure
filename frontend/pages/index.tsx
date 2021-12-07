import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { ServerStyleSheet } from "styled-components";
import MainPage from "../components/MainPage";
// import Head from "../components/Head";
import PostComponent from "../components/PostComponent";
import { MainDiv } from "../components/styled-components/StyledComponents";
import IndexPaginated from "./posts/[pid]";

export default function Home() {
  return null;
  // (
  // <MainDiv>
  //   <MainPage pagination={0}></MainPage>
  // </MainDiv>
  // <IndexPaginated pid={1}></IndexPaginated>
  // );
}

export function getServerSideProps() {
  // const pagination = 0;
  // return { props: { pagination } };
  return {
    redirect: {
      permanent: false,
      destination: "/posts/1",
    },
    props: {},
  };
}
