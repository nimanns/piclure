import styled from "styled-components";
import { useMainContext } from "../libs/MainContext";

function Footer() {
  const {theme} = useMainContext();
  return (
    <div data-light className="footer">
      <div className="links-wrapper">
        <div className="links">
          <a href="#">Placeholder 1</a>
          <a href="#">Placeholder 2</a>
          <a href="#">Placeholder 3</a>
          <a href="#">Placeholder 4</a>
          <a href="#">Placeholder 5</a>
          <a href="#">Placeholder 6</a>
        </div>
        <div className="links">
          <a href="#">Placeholder 7</a>
          <a href="#">Placeholder 8</a>
          <a href="#">Placeholder 9</a>
          <a href="#">Placeholder 10</a>
          <a href="#">Placeholder 11</a>
          <a href="#">Placeholder 12</a>
        </div>
      </div>
      <h4>Piclure &copy; {new Date().getFullYear()}</h4>
    </div>
  );
}

export default Footer;
