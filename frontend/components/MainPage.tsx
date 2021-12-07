import { MainDiv } from "./styled-components/StyledComponents";
import PostComponent from "./PostComponent";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import styled from "styled-components";
import ErrorDisplay from "./Error";
import Loading from "../components/Loading";
import { GET_POSTS_QUERY } from "../graphql/queries/GET_POSTS_QUERY";
import {
  GET_POSTS_QUERY_getPosts,
  GET_POSTS_QUERY as GetPostsType,
} from "../graphql/queries/types/GET_POSTS_QUERY";
import { useMainContext } from "../libs/MainContext";

const PaginationDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2em;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: ${props=>props.theme.lightest};
`;

export default function MainPage({ pagination, user }) {
  const { data, error, loading } = useQuery<GetPostsType>(GET_POSTS_QUERY, {
    // ssr: true,

    variables: {
      pagination: pagination === 0 ? pagination : (pagination - 1) * 6,
    },
  });
  if (loading) return <Loading></Loading>;
  if (error) return <ErrorDisplay message={error.message}></ErrorDisplay>;
  const { getPosts: posts } = data;
  const pages = Array.from(
    { length: Math.ceil(posts.totalCount / 6) },
    (_, i) => i + 1
  );
  const {theme} = useMainContext();
  return (
    <>
      <PaginationDiv
        theme={theme}
        style={{ display: "flex", flexDirection: "row", gap: "2em" }}
      >
        <Link
          href={`/posts/${
            pagination - 1 === 1
              ? "1"
              : pagination - 1 <= 0
              ? "1"
              : pagination - 1
          }`}
        >
          <a>Prev</a>
        </Link>
        {pages.map((pageNum) => (
          <Link key={pageNum} href={`/posts/${pageNum === 1 ? "1" : pageNum}`}>
            <a>
              <p>{pageNum}</p>
            </a>
          </Link>
        ))}
        <Link
          href={`/posts/${
            +pagination + 1 === 1
              ? "2"
              : +pagination + 1 > pages.length
              ? pages.length
              : +pagination + 1
          }`}
        >
          <a>Next</a>
        </Link>
      </PaginationDiv>

      {posts?.results?.map((post, index) => {
        return (
          <PostComponent
            likes={post.likes}
            key={post.id}
            id={+post.id}
            title={post.title}
            uploader={post.uploader?.username}
            date={post.dateTime}
            links={post.relatedImages}
            description={post.description}
          ></PostComponent>
        );
      })}
    </>
  );
}
