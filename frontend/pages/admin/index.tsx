import { HeadDiv } from "../../components/styled-components/StyledComponents";
import styled from "styled-components";
import { PostDiv } from "../../components/styled-components/StyledComponents";
import UploadComponent from "../../components/UploadComponent";
import { serverSideAdminApproval } from "../../libs/useUser";
import ClientOnly from "../../components/ClientOnly";
import { useMainContext } from "../../libs/MainContext";
import { useRouter } from "next/router";

const AdminMainDiv = styled.div`
  min-height: 100vh;
  margin: 2em 4em;
  padding: 0 2em;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  * {
    /* margin: 1em; */
  }
  /* grid-template-rows:repeat(auto-fit,minmax(300px,1fr)); */

  @media screen and (max-width: 590px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    margin: 0;
    padding: 0;
  }
`;

export default function adminPage() {
  if (typeof window === "undefined") return null;
  const { user, theme } = useMainContext();
  const router = useRouter();
  return (
    <>
      {user && (
        <ClientOnly>
          <HeadDiv>
            <h1>Admin Panel</h1>
          </HeadDiv>
          <AdminMainDiv>
            <PostDiv theme={theme}>
              <a>
                <h1>Upload</h1>
              </a>
              <UploadComponent></UploadComponent>
            </PostDiv>
            <PostDiv theme={theme}>
              <a>
                <h1>Stats</h1>
              </a>
            </PostDiv>
          </AdminMainDiv>
        </ClientOnly>
      )}
    </>
  );
}

export function getServerSideProps(ctx) {
  return serverSideAdminApproval(ctx);
}
