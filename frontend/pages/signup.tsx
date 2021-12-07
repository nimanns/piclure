import SignUp from "../components/SignUp";
import { MainDiv } from "../components/styled-components/StyledComponents";
import { serverSideGetUser } from "../libs/useUser";

export default function SignUpPage() {
  return (
    <MainDiv>
      <SignUp></SignUp>
    </MainDiv>
  );
}

export function getServerSideProps(ctx){
  return serverSideGetUser(ctx);
}