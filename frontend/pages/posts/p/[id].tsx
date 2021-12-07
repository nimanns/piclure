import { useMutation, useQuery } from "@apollo/client";
import {
  CustomBtn,
  MainDiv,
  PostDiv,
} from "../../../components/styled-components/StyledComponents";
import { GET_POSTS_QUERY } from "../../../graphql/queries/GET_POSTS_QUERY";
import { GET_SINGLE_POST } from "../../../graphql/queries/GET_SINGLE_POST";
import {
  GET_SINGLE_POST as SinglePostType,
  GET_SINGLE_POST_getPostById_relatedImages,
} from "../../../graphql/queries/types/GET_SINGLE_POST";
import Image from "next/image";
import { dateAndTimeFormatter } from "../../../libs/dateAndTimeFormatter";
import { CREATE_COMMENT_MUTATION as CreateCommentType } from "../../../graphql/mutations/types/CREATE_COMMENT_MUTATION";
import { CREATE_COMMENT_MUTATION } from "../../../graphql/mutations/createComment";
import { useEffect, useState } from "react";
import { initializeApollo } from "../../../libs/apollo";
import styled from "styled-components";
import { useMainContext } from "../../../libs/MainContext";
import ErrorDisplay from "../../../components/Error";
import { mediaEndpoint } from "../../../config";

const CommentSection = styled.div`
  margin: 4em;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
  form {
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    justify-content: center;
    align-items: center;
    textarea {
      font-size: 18px;
      padding: 0.4em;
      font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
        Helvetica Neue, sans-serif;
      width: 100%;
    }
  }

  div.comment-obj {
    border-radius: 5px;
    width: 90%;
    margin: 0 auto;
    background: ${(props) => props.theme.lightest};
    box-shadow: 0 2px 1em #00000042;
    h3 {
      border-radius: 5px 5px 0 0;
      margin: 0;
      background: ${(props) => props.theme.lighter};
      padding: 1em;
    }
    p {
      padding: 0 0 0 1em;
    }
    h4 {
      margin-left: auto;
      width: fit-content;
      padding: 0 1em 0 0;
      font-weight: normal;
    }
  }
`;

export default function SinglePostPage({ id }) {
  const [content, setContent] = useState<string>("");
  const { data, loading, error } = useQuery<SinglePostType>(GET_SINGLE_POST, {
    ssr: true,
    variables: { id },
  });

  const [
    createComment,
    { data: commentData, error: commentError, loading: commentLoading },
  ] = useMutation<CreateCommentType>(CREATE_COMMENT_MUTATION, {
    variables: { postId: id, content: content },
    refetchQueries: [GET_SINGLE_POST],
  });
  const { theme, user } = useMainContext();
  async function comment(e) {
    e.preventDefault();
    try {
      const res = await createComment();
      if (res?.data?.createComment?.comment?.id) {
        const textarea = document.querySelector(
          "textarea[data-commenttext"
        ) as HTMLTextAreaElement;
        textarea.value = "";
      }
    } catch (e) {}
  }


  useEffect(() => {
    if (typeof window !== "undefined")
      document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  if (loading) return "loading";
  if (error) return "Error";
  return (
    <MainDiv>
      <PostDiv>
        <h1>{data.getPostById.title}</h1>
        <div className="description"
          dangerouslySetInnerHTML={{ __html: data.getPostById.description }}
        ></div>
        {data.getPostById.relatedImages.map(
          (el: GET_SINGLE_POST_getPostById_relatedImages) => {
            return (
              <div
                key={el.id + el.image}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  paddingBottom: "100%",
                  margin: "1em",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="contain"
                  src={`${mediaEndpoint}/${el.image}`}
                ></Image>
              </div>
                // <img width="100%" src={prod?prodImages[el.image]:`${mediaEndpoint}/${el.image}`}/>
            );
          }
        )}
        <p>{`Published on ${dateAndTimeFormatter(
          data.getPostById.dateTime
        )} by ${data.getPostById.uploader.username}`}</p>

        <CommentSection theme={theme}>
          {commentError && <ErrorDisplay message={commentError.message} />}
          <form aria-disabled={true} onSubmit={comment}>
            {user
              ? `Comment as ${user?.username}:`
              : "You're not signed in, sign in to leave a comment"}
            <textarea
              data-commenttext
              rows={5}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <CustomBtn type="submit">Submit</CustomBtn>
          </form>

          {data.getPostById.comments.map((comment) => {
            return (
              <div className="comment-obj" key={comment.id + comment.publisher}>
                <h3>{comment?.publisher?.username}: </h3>
                <p>{comment?.comment}</p>
                <h4>
                  <>-{dateAndTimeFormatter(comment?.dateTime)}</>
                </h4>
              </div>
            );
          })}
        </CommentSection>
      </PostDiv>
    </MainDiv>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const { id } = query;
    const apolloClient = initializeApollo();
    await apolloClient.query({
      query: GET_SINGLE_POST,
      variables: {
        id,
      },
    });
    return { props: { id, initialApolloState: apolloClient.cache.extract() } };
  } catch (e) {
    console.log("here");
    return { props: { id: query.id } };
  }
}
