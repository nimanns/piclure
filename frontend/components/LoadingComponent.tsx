import styled from "styled-components";
import { useMainContext } from "../libs/MainContext";
const LoadingIndicator = styled.div`
  width: 100%;
  height: 20px;
  background: ${(props) => props.theme.light};
  border-radius: 5px;
  color: black;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-weight: normal;
  }
  &.active {
    animation: loadinganimation 1s ease infinite;
  }

  @keyframes loadinganimation {
    0% {
      box-shadow: 0 0 10px ${(props) => props.theme.darker};
    }
    50% {
      box-shadow: 0 0 20px ${(props) => props.theme.darker};
    }
    100% {
      box-shadow: 0 0 10px ${(props) => props.theme.darker};
    }
  }
`;
export default function LoadingComponent({
  loading,
  done,
}: {
  loading: Boolean;
  done: Boolean;
}) {
  const { theme } = useMainContext();
  return (
    <LoadingIndicator theme={theme} className={`${loading ? "active" : ""}`}>
      <p>{loading ? "signing up" : done ? "Done!" : ""}</p>
    </LoadingIndicator>
  );
}
