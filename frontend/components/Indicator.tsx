import React from "react";
import styled from "styled-components";

const IndicatorMessage = styled.div`
  position: absolute;
  background: black;
  color: white;
  padding: 0.4em;
  width: 200px;
  left: -10em;
  top: -5em;
  display: none;
  justify-content: center;
  align-items: center;
  border-left: 5px solid grey;
  p {
    pointer-events: none;
  }
`;

export default function Indicator({
  message = "",
  error = false,
  loading = false,
}: {
  message?: string;
  error?: boolean;
  loading?: boolean;
}) {
  function showMessage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    const msg = target.lastElementChild as HTMLDivElement;
    if (msg) msg.style.display = "flex";
  }
  function hideMessage(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    const msg = target.lastElementChild as HTMLDivElement;
    if (msg && msg.hasAttribute("style")) msg.removeAttribute("style");
  }
  if (loading) {
    return (
      <div className="indicator">
        <svg
          width="38"
          height="38"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="8.042%"
              y1="0%"
              x2="65.682%"
              y2="23.865%"
              id="a"
            >
              <stop stopColor="#000000" stopOpacity="0" offset="0%" />
              <stop stopColor="#000000" stopOpacity=".631" offset="63.146%" />
              <stop stopColor="#111111" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)">
              <path
                d="M36 18c0-9.94-8.06-18-18-18"
                id="Oval-2"
                stroke="url(#a)"
                strokeWidth="2"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </path>
              <circle fill="#2e2d2d" cx="36" cy="18" r="1">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    );
  }
  if (error) {
    return (
      <div
        onMouseEnter={(e) => {
          showMessage(e);
        }}
        onMouseLeave={(e) => {
          hideMessage(e);
        }}
        className="indicator"
      >
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 490 490"
          pointerEvents="none"
        >
          <path
            pointerEvents="none"
            d="M76.563,490h336.875C455.547,490,490,455.547,490,413.438V76.563C490,34.453,455.547,0,413.437,0H76.563
            C34.453,0,0,34.453,0,76.563v336.875C0,455.547,34.453,490,76.563,490z M124.835,175.445l50.61-50.611L245,194.39l69.555-69.555
            l50.61,50.611L295.611,245l69.555,69.555l-50.61,50.611L245,295.611l-69.555,69.555l-50.61-50.61L194.389,245L124.835,175.445z"
          />
        </svg>
        <IndicatorMessage
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const target = e.target as HTMLDivElement;
            if (target.hasAttribute("style")) {
              target.removeAttribute("style");
            }
          }}
        >
          <p>{message}</p>
        </IndicatorMessage>
      </div>
    );
  }
  return (
    <div
      onMouseEnter={(e) => {
        showMessage(e);
      }}
      onMouseLeave={(e) => {
        hideMessage(e);
      }}
      className="indicator"
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        viewBox="0 0 512 512"
        pointerEvents="none"
      >
        <path
          pointerEvents="none"
          d="M256 0C115 0 0 115 0 256s115 256 256 256 256-115 256-256S397 0 256 0zM387 227 253 361c-8 8-18 12-28 12s-21-4-28-12l-70-70c-16-16-16-41 0-57 16-16 41-16 57 0l42 42 105-105c16-16 41-16 57 0C402 185 402 211 387 227z"
        />
      </svg>

      {message !== "" && (
        <IndicatorMessage
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const target = e.target as HTMLDivElement;
            if (target.hasAttribute("style")) {
              target.removeAttribute("style");
            }
          }}
        >
          <p>{message}</p>
        </IndicatorMessage>
      )}
    </div>
  );
}
