import styled from "styled-components";
import LoginPanel from "./LoginPanel";
import Link from "next/link";
import { useMainContext } from "../libs/MainContext";
import { CustomBtn } from "./styled-components/StyledComponents";

const NotLoggedInDiv = styled.div`
  background-color: ${(props) => props.theme.dark};
  color: white;
  user-select: none;
  position: relative;
  border-radius: 5px;

  p {
    user-select: none;
  }
  h4 {
    font-weight: normal;
    padding: 0.4em;
    cursor: pointer;
  }
`;
const FloatingPanel = styled.div`
  display: flex;
  flex-direction: column;
  top: 2.5em;
  right: 0;
  position: absolute;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.514));
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.4s ease-out;
  z-index: 90;
  div.arrow {
    min-width: 100%;
    min-height: 0.6em;
    background-color: ${(props) => props.theme.lightest};
    clip-path: polygon(85% 0%, 80% 100%, 90% 100%);
  }
  div.content {
    background-color: ${(props) => props.theme.lightest};
    min-height: 10em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 5px;
    color: black;
    width: 100%;
    margin-top: -5px;

    & > button:last-of-type {
      margin: 0 auto 1.5em auto;
    }
  }
`;

export default function NotLoggedInComp() {
  function hideFloatingPanel() {
    const floatingPanel: HTMLElement =
      document.querySelector("div#floating-panel");
    if (!floatingPanel) return;
    if (floatingPanel.hasAttribute("style")) {
      floatingPanel.removeAttribute("style");
    }
  }
  function toggleFloatingPanel() {
    const floatingPanel: HTMLElement =
      document.querySelector("div#floating-panel");
    if (!floatingPanel) return;
    if (floatingPanel.hasAttribute("style")) {
      floatingPanel.removeAttribute("style");
    } else {
      floatingPanel.style.transform = "none";
      floatingPanel.style.opacity = "1";
      floatingPanel.style.pointerEvents = "all";
    }
  }
  document.addEventListener("click", () => {
    hideFloatingPanel();
  });
  const { theme } = useMainContext();
  return (
    <NotLoggedInDiv theme={theme}>
      <h4
        onClick={(e) => {
          e.stopPropagation();
          toggleFloatingPanel();
        }}
      >
        not signed in
      </h4>
      <FloatingPanel
        onClick={(e) => {
          e.stopPropagation();
        }}
        theme={theme}
        id="floating-panel"
      >
        <div className="arrow"></div>
        <div className="content">
          <LoginPanel next="" />
          <Link href="/signup">
            <CustomBtn
              theme={theme}
              onClick={toggleFloatingPanel}
              className="login-panel-btn"
            >
              Sign Up
            </CustomBtn>
          </Link>
        </div>
      </FloatingPanel>
    </NotLoggedInDiv>
  );
}
