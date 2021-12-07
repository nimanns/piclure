import styled from "styled-components";
const ErrorHead = styled.div`
  margin: 1em auto;
  h1 {
    user-select:none;
    padding: 1em;
    font-size: 20px;
    width: 100%;
    text-align: center;
    background-color: #f13636;
    border-left: 10px solid #000000bc;
    box-shadow: inset 0 0 1.4em #0000004b;
  }
`;
export default function ErrorDisplay({ message }: { message: string }) {
  if (message === "Failed to fetch") {
    return (
      <ErrorHead>
        <h1>Sorry server is unreachable :(</h1>
      </ErrorHead>
    );
  }

  return (
    <ErrorHead>
      <h1>{message !== "" ? message : "Sorry something went wrong :("}</h1>
    </ErrorHead>
  );
}
