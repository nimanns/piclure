import Nav from "./Nav";
import ClientOnly from "../components/ClientOnly";
import { HeadDiv } from "./styled-components/StyledComponents";
import Link from "next/link";
import styled from "styled-components";
import { closeModal, toggleModal } from "../libs/modal";
import { useMainContext } from "../libs/MainContext";
const InnerNav = styled.div`
  font-size: 16px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 1em;
  position: relative;
  div.btn {
    display: none;
    user-select: none;
  }
  a {
    background-color: ${(props) => props.theme.darker};
    color: white;
    padding: 0.4em;
    border-radius: 5px;
  }
  @media only screen and (max-width: 700px) {
    a {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
      pointer-events: none;
      padding: 0.4em;
      transition: all 0.4s ease;
      &:hover {
      }
    }
    div.btn {
      display: flex;
      width: 40px;
      min-height: 40px;
      background: ${(props) => props.theme.darker};
      border-radius: 50%;
      z-index: 10000;
      cursor: pointer;
      position: relative;
      &::after {
        position: absolute;
        content: " ";
        width: 25px;
        height: 2px;
        top: 14px;
        left: 8px;
        background-color: ${(props) => props.theme.lighter};
        transition: all 0.4s ease;
      }
      &::before {
        position: absolute;
        content: " ";
        width: 25px;
        height: 2px;
        top: 25px;
        left: 8px;
        background-color: ${(props) => props.theme.lighter};
        transition: all 0.4s ease;
      }
      &.modal-open {
        &::before {
          top: 19px;
          left:10px;
          transform: rotate(-45deg);
          transform-origin: middle;
          width: 20px;
        }
        &::after {
          top: 19px;
          left:10px;
          transform: rotate(45deg);
          transform-origin: middle;
          width: 20px;
        }
      }
    }
  }
`;

function Head() {
  const { theme } = useMainContext();
  return (
    <HeadDiv theme={theme}>
      <div className="title">
        <Link href="/">
          <a>Piclure</a>
        </Link>
        <InnerNav theme={theme}>
          <Link href="/">
            <a onClick={closeModal}>Home</a>
          </Link>
          <Link href="/contact">
            <a onClick={closeModal}>Contact</a>
          </Link>
          <Link href="/about">
            <a onClick={closeModal}>About</a>
          </Link>
          <Link href="/FAQ">
            <a onClick={closeModal}>FAQ</a>
          </Link>
          <div
            className="btn"
            data-togglebtn
            onClick={(e) => {
              toggleModal(e);
            }}
          ></div>
        </InnerNav>
      </div>

      <ClientOnly>
        <Nav></Nav>
      </ClientOnly>
    </HeadDiv>
  );
}

export { Head };
