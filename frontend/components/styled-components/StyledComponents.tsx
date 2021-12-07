import styled from "styled-components";
import { vars } from "../../styles/globalVariables";

const HeadDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.darkerer};
  color:white;
  width: 100%;
`;

const MainDiv = styled.div`
  max-width: 1300px;
  margin: 5em auto;
  min-height: 100vh;
`;
const FooterComp = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.lighter};
  padding: 1em;
  padding-bottom: 5em;
`;
const NavDiv = styled.div`
  background-color: ${(props) => props.theme.darker};
  color: white;
  width: auto;
  white-space: nowrap;
  min-width: fit-content;
  max-height: 60px;
  margin: auto 1em;
  & div {
    white-space: nowrap;
    /* width: fit-content; */
  }
  & div p {
    /* margin: 0; */
    white-space: nowrap;
    padding: 0.4em;
  }
  & div p span.username {
    color: white;
    background-color: #000;
    padding: 0.4em;
  }
  @media only screen and (max-width: 400px) {
    & div {
      & p {
        padding: 0;
      }
      & span.message {
        display: none;
      }
    }
  }
`;

const PostDiv = styled.div`
  border-radius: 5px;
  a {
    margin-right: auto;
    background: transparent;
    padding: 1em;
    h1 {
      background: none;
      font-weight: bold;
      cursor: pointer;
    }
  }
  h1 {
    all: unset;
    background-color: ${(props) => props.theme.light};
    box-sizing: border-box;
    width: 100%;
    padding: 0.6em;
    font-size: 20px;
  }
  img {
    padding-bottom: 0;
  }
  margin: 4em 1em;
  background-color: ${(props) => props.theme.lighterer};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  transition: all 0.5s ease;
  box-shadow: 0 2px 1em #00000042;
  div.description{
    text-align:left;
    display:flex;
    width:100%;
    p{
      padding:1em;
      text-align:left;
    }
  }
  div.details {
    width: 100%;
    div.date-time {
      background: ${(props) => props.theme.lighter};
      padding: 0 1em;
      color:black;
    }
    div.uploader {
      background: ${(props) => props.theme.lighter};
      color:black;
      text-align: right;
      padding: 0 1em;
      border-left: 1px solid rgb(194, 194, 194);
      @media only screen and (max-width: 528px) {
        border-left: none;
        border-top: 1px solid rgb(194, 194, 194);
      }
    }
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`;

const CustomBtn = styled.button`
  all: unset;
  cursor: pointer;
  width: 200px;
  text-align: center;
  margin: 1.5em 1.5em 0 1.5em;
  padding: 1em;
  color: black;
  border-radius: 5px;
  background-color: ${(props) => props.theme.lightest};
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease;
  border: 1px solid black;
  /* margin: 1.4em; */
  padding: 0.4em;
  &:focus-visible{
    box-shadow:0 0 .4em #0000008f;        
    background-color:${props=>props.theme.lightest}
  }
  &:hover {
    background-color: ${(props) => props.theme.lighter};
  }
  &::before {
    content: " ";
    position: absolute;
    border-radius: 50%;
    left: -50px;
    top: -50px;
    background-color: #a5a5a563;
    width: 70px;
    height: 70px;
    transition: all 0.4s ease;
    opacity: 0;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
  }
  &:active {
    /* box-shadow: 0 0 1em ${(props) => props.theme.lightest} inset; */
    &::before {
      width: 200px;
      height: 200px;
      left: 200px;
      top: 50px;
      opacity: 0.5;
      padding: 0;
      margin: 0;
      opacity: 1;
      transition: 0s;
    }
  }
  &:disabled {
    background-color: grey;
    cursor: default;
    color: black;
  }
  &:disabled:hover {
    background: grey;
    color: black;
    cursor: default;
  }
`;

const CustomInput = styled.input`
  all: unset;
  width: 100%;
  background-color: #ffffff7a;
  border: 1px solid #00000028;
  padding: 0.6em;
  box-sizing: border-box;
  color: black;
  border-radius: 5px;

  position: absolute;
  &:not(:placeholder-shown) + div.input-label > label,
  &:focus-visible + div.input-label > label,
  &:-webkit-autofill + div > label {
    opacity: 0;
    margin-left: 10px;
  }
`;

export { HeadDiv, NavDiv, MainDiv, PostDiv, CustomBtn, CustomInput };
