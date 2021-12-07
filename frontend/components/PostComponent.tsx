import ClientOnly from "./ClientOnly";
import SlideShow from "./SlideShow";
import { PostDiv } from "./styled-components/StyledComponents";
import Link from "next/link";
import { useMainContext } from "../libs/MainContext";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_POST_MUTATION } from "../graphql/mutations/likePost";
import { GET_POSTS_QUERY } from "../graphql/queries/GET_POSTS_QUERY";
import { LIKED_POST_QUERY } from "../graphql/queries/LIKED_POST_QUERY";
import { LIKED_POST_QUERY as LikedPost } from "../graphql/queries/types/LIKED_POST_QUERY";
import styled from "styled-components";
import { useEffect, useState } from "react";
import likeCountFormatter from "../libs/likeCountFormatter";
import { dateAndTimeFormatter } from "../libs/dateAndTimeFormatter";
import { LIKE_POST_MUTATION as LikePostMutationType } from "../graphql/mutations/types/LIKE_POST_MUTATION";
import Indicator from "./Indicator";

const LikeAnchor = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4em;
  position: relative;
  user-select: none;
  div.like-btn-error {
    font-size: 15px;
    position: absolute;
    left: 100px;
    top: -10px;
    width: 150px;
    height: 70px;
    background-color: ${(props) => props.theme.darker};
    color: ${(props) => props.theme.lighter};
    display: flex;
    padding: 1em;
    border-left: 5px ${(props) => props.theme.light} solid;
    text-align: left;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.4s forwards;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const LikeAnimation = styled.div`
  position: absolute;
  left: 45px;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  div {
    width: 4px;
    height: 4px;
    opacity: 0;
    position: absolute;
  }

  div.one {
    background-color: red;
    animation: anim 2s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
  }
  div.two {
    margin-left: 5px;
    margin-top: -3px;
    background-color: #fffb00;
    animation: anim2 2s cubic-bezier(0.68, 0.29, 0.42, 0.3) forwards;
  }

  div.three {
    margin-left: -5px;
    margin-top: 0px;
    background-color: #ff05d5;
    animation: anim3 2s cubic-bezier(0.68, 0.29, 0.42, 0.3) forwards;
  }
  div.four {
    margin-left: 5px;
    margin-top: -3px;
    background-color: #fdaee5;
    animation: anim4 2s cubic-bezier(0.68, 0.29, 0.42, 0.3) forwards;
  }
  @keyframes anim4 {
    1% {
      top: -7px;
      left: -25px;
      opacity: 1;
    }
    10% {
      top: -13px;
      left: -40px;
      opacity: 1;
    }
    60% {
      top: 10px;
      left: -49px;
      opacity: 0;
    }
    100% {
      top: 10px;
      left: -25px;
    }
  }
  @keyframes anim3 {
    1% {
      top: -7px;
      left: -25px;
      opacity: 1;
    }
    20% {
      top: -4px;
      left: -30px;
      opacity: 1;
    }
    60% {
      top: 4px;
      left: -40px;
      opacity: 0;
    }
    100% {
      top: 10px;
      left: -25px;
    }
  }
  @keyframes anim2 {
    1% {
      top: -7px;
      left: -15px;
      opacity: 1;
    }
    10% {
      top: -13px;
      left: 0;
      opacity: 1;
    }
    60% {
      top: 10px;
      left: 5px;
      opacity: 0;
    }
    100% {
      top: 10px;
      left: 5px;
    }
  }
  @keyframes anim {
    1% {
      top: -10px;
      left: -20px;
      opacity: 1;
    }
    10% {
      top: -20px;
      left: 0;
      opacity: 1;
    }
    60% {
      top: 20px;
      left: 20px;
      opacity: 0;
    }
    100% {
      top: 20px;
      left: 20px;
    }
  }
`;

function Heart({ liked }: { liked: Boolean }) {
  return (
    <>
      {liked ? (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 10 10"
          version="1.1"
          id="svg8"
          className={`${liked ? "pumped-heart" : ""}`}
        >
          <defs id="defs2" />
          <g id="layer1">
            <g
              id="g24"
              transform="matrix(0.83246903,0,0,0.86330159,-80.048668,-102.06961)"
            >
              <path
                style={{ fill: "#e81d62", strokeWidth: "0.0154446" }}
                d="m 101.44306,128.0764 v -0.77223 h -0.77223 -0.772234 v -0.77223 -0.77222 h -0.77223 -0.77223 v -0.77223 -0.77223 h -0.772229 -0.77223 v -1.54446 -1.54446 h 0.77223 0.772229 v -0.77223 -0.77223 h 1.54446 1.544464 v 0.77223 0.77223 h 0.77222 0.77223 v -0.77223 -0.77223 h 1.54446 1.54446 v 0.77223 0.77223 h 0.77223 0.77223 v 1.54446 1.54446 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77223 v 0.77222 0.77223 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77222 z m 1.54445,-1.54446 v -0.77222 h 0.77223 0.77223 v -0.77223 -0.77223 h 0.77223 0.77223 v -1.54446 -1.54446 h -1.54446 -1.54446 v 0.77223 0.77223 h -0.77223 -0.77222 v -0.77223 -0.77223 h -1.544464 -1.54446 v 1.54446 1.54446 h 0.77223 0.77223 v 0.77223 0.77223 h 0.772234 0.77223 v 0.77222 0.77223 h 0.77222 0.77223 z"
                id="path28"
              />
              <path
                style={{ fill: "#f34235", strokeWidth: "0.0154446" }}
                d="m 101.44306,126.53194 v -0.77222 h -0.77223 -0.772234 v -0.77223 -0.77223 h -0.77223 -0.77223 v -0.77223 -0.77223 h 0.77223 0.77223 v -0.77223 -0.77223 h 0.772234 0.77223 v 0.77223 0.77223 h 0.77222 0.77223 v -0.77223 -0.77223 h 1.54446 1.54446 v 1.54446 1.54446 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77223 v 0.77222 0.77223 h -0.77223 -0.77222 z"
                id="path26"
              />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 10 10"
          version="1.1"
          id="svg8"
        >
          <defs id="defs2" />
          <g id="layer1">
            <g
              id="g24"
              transform="matrix(0.83246903,0,0,0.86330159,-80.048668,-102.06961)"
            >
              <path
                style={{ fill: "#3f3f3f", strokeWidth: "0.0154446" }}
                d="m 101.44306,128.0764 v -0.77223 h -0.77223 -0.772234 v -0.77223 -0.77222 h -0.77223 -0.77223 v -0.77223 -0.77223 h -0.772229 -0.77223 v -1.54446 -1.54446 h 0.77223 0.772229 v -0.77223 -0.77223 h 1.54446 1.544464 v 0.77223 0.77223 h 0.77222 0.77223 v -0.77223 -0.77223 h 1.54446 1.54446 v 0.77223 0.77223 h 0.77223 0.77223 v 1.54446 1.54446 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77223 v 0.77222 0.77223 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77222 z m 1.54445,-1.54446 v -0.77222 h 0.77223 0.77223 v -0.77223 -0.77223 h 0.77223 0.77223 v -1.54446 -1.54446 h -1.54446 -1.54446 v 0.77223 0.77223 h -0.77223 -0.77222 v -0.77223 -0.77223 h -1.544464 -1.54446 v 1.54446 1.54446 h 0.77223 0.77223 v 0.77223 0.77223 h 0.772234 0.77223 v 0.77222 0.77223 h 0.77222 0.77223 z"
                id="path28"
              />
              <path
                style={{ fill: "#bdbcbc", strokeWidth: "0.0154446" }}
                d="m 101.44306,126.53194 v -0.77222 h -0.77223 -0.772234 v -0.77223 -0.77223 h -0.77223 -0.77223 v -0.77223 -0.77223 h 0.77223 0.77223 v -0.77223 -0.77223 h 0.772234 0.77223 v 0.77223 0.77223 h 0.77222 0.77223 v -0.77223 -0.77223 h 1.54446 1.54446 v 1.54446 1.54446 h -0.77223 -0.77223 v 0.77223 0.77223 h -0.77223 -0.77223 v 0.77222 0.77223 h -0.77223 -0.77222 z"
                id="path26"
              />
            </g>
          </g>
        </svg>
      )}
    </>
  );
}

function HeartAnimation() {
  return (
    <LikeAnimation>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
      <div className="four"></div>
    </LikeAnimation>
  );
}

export default function PostComponent({
  title,
  uploader,
  links,
  date,
  description,
  id,
  likes,
}: {
  title: string;
  uploader: string;
  links: { image: string }[];
  date: string;
  description: string;
  id: number;
  likes: number;
}) {
  const { theme, user } = useMainContext();
  const [animate, setAnimate] = useState<Boolean>(false);
  const [likedOrNot, setLikedOrNot] = useState<Boolean>(null);

  const {
    data: liked,
    error: likedError,
    loading: likedLoading,
  } = useQuery<LikedPost>(LIKED_POST_QUERY, { variables: { id } });

  useEffect(() => {
    if (liked?.userLiked) {
      setLikedOrNot(true);
    } else {
      setLikedOrNot(false);
    }
  }, [liked?.userLiked]);

  const [likePost, { data, loading, error }] =
    useMutation<LikePostMutationType>(LIKE_POST_MUTATION, {
      variables: { postId: id, liked: liked?.userLiked || false },
      refetchQueries: [GET_POSTS_QUERY, LIKED_POST_QUERY],
    });

  async function like() {
    if (user && likedOrNot) {
      setLikedOrNot(false);
    } else if (user && !likedOrNot) {
      setLikedOrNot(true);
    }
    try {
      const data = await likePost();
      if (!liked.userLiked && !animate) {
        setAnimate(true);
      }
    } catch (e) {}
  }
  return (
    <PostDiv theme={theme}>
      <Link href={`/posts/p/${id}`}>
        <a>
          <h1>{title}</h1>
        </a>
      </Link>
      <div
        className="like"
        style={{
          width: "fit-content",
          marginRight: "auto",
          marginBottom: "1em",
          paddingLeft: "1em",
        }}
      >
        <LikeAnchor
          theme={theme}
          style={{
            padding: "0 0 0 1.4em",
          }}
          onClick={like}
        >
          <Heart liked={likedOrNot} />
          {animate && liked?.userLiked && <HeartAnimation />}
          <p style={{ display: "inline" }}>
            {likeCountFormatter(likes)} {likes === 1 ? "like" : "likes"}
          </p>
          {/* <div className="like-btn-error">de</div> */}
          {loading && <Indicator loading={true} />}
          {error && <div className="like-btn-error">{error.message}</div>}
        </LikeAnchor>
      </div>
      <SlideShow description={description} links={links}></SlideShow>
      <div className="details">
        <div className="date-time">
          <p>{dateAndTimeFormatter(date)}</p>
        </div>
        <div className="uploader">
          <p>
            <i>{"-" + uploader}</i>
          </p>
        </div>
      </div>
    </PostDiv>
  );
}
