import gql from "graphql-tag";
import { getUser, GET_USER_QUERY } from "../libs/useUser";
import ClientOnly from "./ClientOnly";
import { NavDiv } from "./styled-components/StyledComponents";
import { MainContextProvider, useMainContext } from "../libs/MainContext";
import Link from "next/link";
import NotLoggedInComp from "./NotLoggedInComp";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/mutations/logoutMutation";
import { useState } from "react";
import { LOGOUT_MUTATION as LOGOUTMUTTYPE } from "../graphql/mutations/types/LOGOUT_MUTATION";
import router, { useRouter } from "next/router";
import { GET_POSTS_QUERY } from "../graphql/queries/GET_POSTS_QUERY";
import { LIKED_POST_QUERY } from "../graphql/queries/LIKED_POST_QUERY";
const CHECK_USER_MUTATION = gql`
  mutation CHECK_USER_MUTATION {
    verifyToken {
      payload
    }
  }
`;

export default function Nav() {
  const [userr, setUserr] = useState("no");
  const { user } = useMainContext();
  const router = useRouter();
  console.log(user);
  const [logOutMutation, { loading, error }] = useMutation<LOGOUTMUTTYPE>(
    LOGOUT_MUTATION,
    { refetchQueries: [] }
  );
  async function logOut(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault;
    const data = await logOutMutation();
    if (data.data.deleteTokenCookie.deleted) router.reload();
  }
  return (
    <ClientOnly>
      <NavDiv>
        {user === undefined ? (
          " "
        ) : user !== null ? (
          <>
            {user?.username}{" "}
            {user?.groups === "Admins" && (
              <>
                {" | "}
                <Link href="/admin">
                  <a>Admin</a>
                </Link>
              </>
            )}{" "}
            |{" "}
            <a href="#" onClick={logOut}>
              Log out
            </a>
          </>
        ) : (
          <NotLoggedInComp />
        )}
      </NavDiv>
    </ClientOnly>
  );
}
