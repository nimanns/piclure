import { useMutation } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { getUser, GET_USER_QUERY } from "../libs/useUser";
import { useRouter } from "next/router";
import { CustomBtn, CustomInput } from "./styled-components/StyledComponents";
import { useMainContext } from "../libs/MainContext";
import { GET_POSTS_QUERY } from "../graphql/queries/GET_POSTS_QUERY";
import { LIKED_POST_QUERY } from "../graphql/queries/LIKED_POST_QUERY";
import { LOGIN_MUTATION } from "../graphql/mutations/loginMutation";
const LoginDiv = styled.div`
  width: 100%;
  min-height: 100vh;
`;
const LoginForm = styled.form`
  margin: 0;
  padding: 1em;
  display: flex;
  flex-direction: column;

  input#title {
    font-size: 24px;
    padding: 0.5em;
  }
  div.ck-content {
    background-color: #fff;
    height: 200px;
    div {
      height: 100%;
    }
  }
`;



export default function LoginPanel({ next }) {
  const router = useRouter();
  const { getUser: tempUser } = getUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation, { data, loading, error }] = useMutation(
    LOGIN_MUTATION,
    {
      refetchQueries: [GET_USER_QUERY,GET_POSTS_QUERY,LIKED_POST_QUERY],
      variables: {
        username,
        password,
      },
    }
  );
  async function login(e) {
    e.preventDefault();
    try {
      await loginMutation();
      // router.reload();
    } catch (e) {
      console.log(e);
    }
  }
  const { theme } = useMainContext();
  return (
    <>
      {error && <p className="error">{error.message}</p>}
      <h3 style={{textAlign:"center"}}>Login</h3>
      <LoginForm onSubmit={login}>
        <div className="input-field">
          <CustomInput
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="login-username"
            placeholder=" "
          />
          <div className="input-label">
            <label htmlFor="username">Username:</label>
          </div>
        </div>

        <div className="input-field">
          <CustomInput
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="login-password"
            placeholder=" "
          />
          <div className="input-label">
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <CustomBtn theme={theme} disabled={loading} type="submit">
          Login
        </CustomBtn>
      </LoginForm>
    </>
  );
}
