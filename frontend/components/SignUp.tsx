import styled from "styled-components";
import debounce from "lodash-es/debounce";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { USER_EXISTS } from "../graphql/queries/USER_EXISTS";
import { useEffect, useRef, useState } from "react";
import { USER_EXISTS as USER_EXISTS_TYPE } from "../graphql/queries/types/USER_EXISTS";
import { isAlphaNumeric } from "../libs/isAlphaNum";
import Indicator from "./Indicator";
import emailValidation from "../libs/emailValidation";
import { SIGNUP_MUTATION } from "../graphql/mutations/signUpMutation";
import { SIGNUP_MUTATION as SignUpMutationType} from "../graphql/mutations/types/SIGNUP_MUTATION";

import { isAlphabet } from "../libs/isAlphabet";
import ErrorDisplay from "./Error";
import { useMainContext } from "../libs/MainContext";
import { CustomBtn } from "./styled-components/StyledComponents";
import { LOGIN_MUTATION as LoginMutationType } from "../graphql/mutations/types/LOGIN_MUTATION";
import { LOGIN_MUTATION } from "../graphql/mutations/loginMutation";
import { useRouter } from "next/router";
import LoadingComponent from "./LoadingComponent";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background: ${(props) => props.theme.lightest};
  box-shadow: 0 0 1em #0000007b;
  border-radius: 5px;

  button {
    text-align: center;
  }
  input {
    all: unset;
    width: 100%;
    border-radius: 5px;
    background-color: #ffffff7a;
    border: 1px solid #00000028;
    padding: 0.6em;
    box-sizing: border-box;
    position: absolute;
    &:not(:placeholder-shown) + div.input-label > label,
    &:focus-visible + div.input-label > label,
    &:-webkit-autofill + div > label {
      opacity: 0;
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 590px) {
    max-width: 90%;
  }
`;

interface UserData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputStates {
  name: boolean;
  lastname: boolean;
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const [usr, setUsr] = useState<UserData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [username, setUsername] = useState("");

  const [states, setStates] = useState<InputStates>({
    name: false,
    lastname: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [signUp, { error: errorMain, loading:loadingMain, data: dataMain }] =
    useMutation<SignUpMutationType>(SIGNUP_MUTATION, {
      variables: {
        name: usr.name,
        lastname: usr.lastname,
        email: usr.email,
        username: username,
        password: usr.password,
      },
    });
  const [checkAvailability, { error, called, loading: loading2, data }] =
    useLazyQuery<USER_EXISTS_TYPE>(USER_EXISTS, {
      fetchPolicy: "network-only",
    });

  const [login, { error: loginError, loading: loginLoading, data: loginData }] =
    useMutation<LoginMutationType>(LOGIN_MUTATION);

  const [userAlphanum, setUserAlphanum] = useState<boolean>(false);

  let userExists2 = false;
  const initialRender = useRef(true);

  if (data) {
    userExists2 = data.userExists;
  }

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (username.length <= 3) return;
    checkAvailability({ variables: { username: username } });
  }, [username]);

  const inputData = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (!isAlphaNumeric(target.value)) return setUserAlphanum(true);
    if (userAlphanum) setUserAlphanum(false);
    setUsername(target.value);
  }, 800);

  function inputDataWithoutDebounce(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setUsr({ ...usr, [target.name]: target.value });
  }

  function checkFormData(): boolean {
    for (const value of Object.values(usr)) {
      if (value === "") return true;
    }
    if (
      usr.confirmPassword !== usr.password ||
      userExists2 ||
      userAlphanum ||
      username === "" ||
      username.length < 4 ||
      !isAlphabet(usr.name) ||
      !isAlphabet(usr.lastname)
    )
      return true;
    if (!emailValidation(usr.email)) return true;
    return false;
  }
  const { theme } = useMainContext();
  return (
    <>
    <SignUpForm
      theme={theme}
      onSubmit={async (e) => {
        e.preventDefault();
        if (checkFormData()) return;
        try {
          const response = await signUp();
          if (response?.data?.createUser?.user?.id) {
            await login({
              variables: {
                username: response?.data?.createUser?.user?.username,
                password: usr.password,
              },
            });
            router.reload();
          }
        } catch (e) {
          console.log(e);
        }
      }}
      >
      <LoadingComponent loading={loadingMain} done={dataMain?.createUser?.user?.id?true:false}></LoadingComponent>
      <h1>Sign Up</h1>
      {errorMain ? <ErrorDisplay message={errorMain.message} /> : ""}
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputDataWithoutDebounce(e);
          }}
          onBlur={() => {
            setStates({ ...states, name: true });
          }}
          type="text"
          name="name"
          id="name"
          className={`${
            (!usr.name && states.name) ||
            (!isAlphabet(usr.name) && usr.name !== "")
              ? "border-red"
              : usr.name !== "" && isAlphabet(usr.name)
              ? "border-green"
              : ""
          }`}
        />
        <div className="input-label">
          <label htmlFor="name">
            {!usr.name && states.name ? "Name can't be empty" : "Name"}
          </label>
          {!isAlphabet(usr.name) && usr.name !== "" ? (
            <Indicator
              error={true}
              message="Names can only include words from the English alphabet"
            />
          ) : isAlphabet(usr.name) && usr.name !== "" ? (
            <Indicator />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputDataWithoutDebounce(e);
          }}
          onBlur={() => {
            setStates({ ...states, lastname: true });
          }}
          type="text"
          name="lastname"
          id="lastname"
          className={`${
            (!usr.lastname && states.lastname) ||
            (!isAlphabet(usr.lastname) && usr.lastname !== "")
              ? "border-red"
              : usr.lastname !== "" && isAlphabet(usr.lastname)
              ? "border-green"
              : ""
          }`}
        />
        <div className="input-label">
          <label htmlFor="lastname">
            {!usr.lastname && states.lastname
              ? "Last name cen't be empty"
              : "Last Name"}
          </label>
          {!isAlphabet(usr.lastname) && usr.lastname !== "" ? (
            <Indicator
              error={true}
              message="Lastnames can only include words from the English alphabet"
            />
          ) : isAlphabet(usr.lastname) && usr.lastname !== "" ? (
            <Indicator />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputDataWithoutDebounce(e);
          }}
          onBlur={() => {
            setStates({ ...states, email: true });
          }}
          type="email"
          name="email"
          id="email"
          className={`${
            (!usr.email && states.email) ||
            (!emailValidation(usr.email) && states.email)
              ? "border-red"
              : emailValidation(usr.email)
              ? "border-green"
              : ""
          }`}
        />
        <div className="input-label">
          <label htmlFor="email">
            {!usr.email && states.email ? "Email can't be empty" : "Email"}
          </label>
          {usr.email !== "" && !emailValidation(usr.email) ? (
            <Indicator
              error={true}
              message="Please enter a valid email"
            ></Indicator>
          ) : emailValidation(usr.email) && usr.email !== "" ? (
            <Indicator />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputData(e);
          }}
          onBlur={() => {
            setStates({ ...states, username: true });
          }}
          type="text"
          name="username"
          id="username"
          className={`${
            (!username && states.username) ||
            data?.userExists ||
            userAlphanum ||
            (username.length <= 3 && username !== "")
              ? "border-red"
              : username.length >= 4 &&
                username &&
                !loading2 &&
                !data?.userExists
              ? "border-green"
              : ""
          }`}
        />
        <div className="input-label">
          <label htmlFor="username">
            {!username && states.username
              ? "Username can't be empty"
              : "Username"}
          </label>
          {loading2 && <Indicator loading={true}></Indicator>}
          {username === "" ? (
            ""
          ) : username.length > 3 ? (
            userAlphanum ? (
              <Indicator
                error={true}
                message="only alphanumerics are allowed in usernames"
              />
            ) : username && data ? (
              data.userExists ? (
                <Indicator error={true} message="Username already taken!" />
              ) : (
                <Indicator message="Username Available!"></Indicator>
              )
            ) : (
              ""
            )
          ) : (
            <Indicator
              error={true}
              message="Username must contain 4 or more characters"
            />
          )}
        </div>
      </div>
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputDataWithoutDebounce(e);
          }}
          onBlur={() => {
            setStates({ ...states, password: true });
          }}
          className={`${
            !usr.password && states.password
              ? "border-red"
              : usr.password && usr.password === usr.confirmPassword
              ? "border-green"
              : ""
          }`}
          type="password"
          name="password"
          id="password"
        />
        <div className="input-label">
          <label htmlFor="password">
            {!usr.password && states.password
              ? "Password can't be empty"
              : "Password"}
          </label>
        </div>
      </div>
      <div className="input-field">
        <input
          placeholder=" "
          onChange={(e) => {
            inputDataWithoutDebounce(e);
          }}
          type="password"
          name="confirmPassword"
          id="confirmpassword"
          className={`${
            usr.password !== usr.confirmPassword
              ? "border-red"
              : usr.password !== "" && usr.password === usr.confirmPassword
              ? "border-green"
              : ""
          }`}
        />
        <div className="input-label">
          <label htmlFor="confirmpassword">Confirm Password</label>
          {usr.password !== usr.confirmPassword ? (
            <Indicator error={true} message="Passwords do not match" />
          ) : usr.password !== "" && usr.password === usr.confirmPassword ? (
            <Indicator message="" />
          ) : (
            ""
          )}
        </div>
      </div>
      <CustomBtn disabled={checkFormData()} type="submit">
        Sign Up
      </CustomBtn>
    </SignUpForm>
    </>
  );
}
