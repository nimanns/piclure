import { MainDiv } from "../../components/styled-components/StyledComponents";

export default function ErrorPage({ err }) {
  console.log(err);
  return (
    <MainDiv>
      <h1>Sorry! Something came up</h1>
      <h2>{err}</h2>
    </MainDiv>
  );
}
