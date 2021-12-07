import styled from "styled-components";
import debounce from "lodash/debounce";
import { useMainContext } from "../libs/MainContext";
import { mediaEndpoint} from "../config";

const SlideShowDiv = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: transparent;
  transition: all 1s ease;
  min-height: 50px;
`;

const SlideShowImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  transition: opacity 1.4s ease;
  &:first-child {
    position: relative;
  }
`;

const Pagination = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 21;
  div {
    pointer-events: all;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
  }
  a {
    font-size: 11px;
    line-height:1.5em;
    margin: 0 0.5em;
    padding: 0.5em;
    width: 2.5em;
    height: 2.5em;
    text-align: center;
    border-radius: 50%;
    background-color: ${props=>props.theme.lightest};
    transition: filter 0.4s ease;
    user-select: none;
    :hover {
      filter: hue-rotate(40deg);
    }
  }
`;

const DescriptionDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #ffffff67;
  z-index: 99;
  width: 100%;
  padding: 1em;
  transition: all 0.4s ease;
  max-height: 40%;
  display: flex;
  flex-direction: column;
  div.content {
    overflow-y: hidden;
    p{
      background-color:${props=>props.theme.lightest};
      padding:.6em;
    }
  }
  div.pin {
    display: flex;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    background-color: red;
    margin-left: auto;
    position: relative;
    cursor: pointer;
  }
`;

const removeStyle = debounce((elem: HTMLElement) => {
  elem.removeAttribute("style");
}, 1000);

export default function SlideShow({
  links,
  description,
}: {
  links: { image: string }[];
  description: string;
}) {
  const {theme}=useMainContext();
  function changeSlide(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    indx: number
  ) {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const children =
      target.parentElement.parentElement.parentElement.getElementsByTagName(
        "img"
      ) as HTMLCollection;
    const targetImage = children[indx] as HTMLImageElement;
    targetImage.style.opacity = "1";
    if (
      target.parentElement.parentElement.parentElement.getBoundingClientRect()
        .height !== targetImage.getBoundingClientRect().height
    ) {
      target.parentElement.parentElement.parentElement.style.height =
        target.parentElement.parentElement.parentElement.offsetHeight + "px";
      target.parentElement.parentElement.parentElement.style.height =
        targetImage.getBoundingClientRect().height + "px";
      removeStyle(target.parentElement.parentElement.parentElement);
    }
    targetImage.style.position = "relative";
    targetImage.style.zIndex = "20";
    for (let item in children) {
      if (parseInt(item) !== indx) {
        const other = children[parseInt(item)] as HTMLImageElement;
        if (typeof other === "object") {
          other.style.opacity = "0";
          other.style.position = "absolute";
          other.style.zIndex = "0";
        }
      }
    }
  }
  function toggleDescription(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const div = e.target as HTMLDivElement;
    const nextDiv = div.nextSibling as HTMLElement;
    if (nextDiv.innerHTML === "") return;
    if (div.parentElement.hasAttribute("style")) {
      return div.parentElement.removeAttribute("style");
    } else {
      const height = nextDiv.offsetHeight;
      div.parentElement.style.bottom = -height + "px";
    }
  }

  return (
    <SlideShowDiv>
      {links?.map((el, ind) => {
        return (
          <SlideShowImg
            loading="lazy"
            style={
              ind === 0 ? { opacity: 1, zIndex: 20 } : { opacity: 0, zIndx: 0 }
            }
            key={el["image"]}
            width="100%"
            src={`${mediaEndpoint}/${el["image"]}`}
          ></SlideShowImg>
        );
      })}
      <Pagination theme={theme}>
        <div>
          {links.length > 1
            ? links?.map((el, indx) => {
                return (
                  <a
                    key={el["image"] + indx}
                    onClick={(e) => changeSlide(e, indx)}
                    href={indx.toString()}
                  >
                    {indx + 1}
                  </a>
                );
              })
            : ""}
        </div>
      </Pagination>

      <DescriptionDiv theme={theme} data-des>
        <div
          onClick={(e) => {
            toggleDescription(e);
          }}
          className="pin"
        ></div>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="content"
        ></div>
      </DescriptionDiv>
    </SlideShowDiv>
  );
}
