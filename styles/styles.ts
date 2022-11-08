import { createGlobalStyle, css } from "styled-components";

export const nonSelectableCSS = css`
  &,
  * {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;

    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
`;

export const GlobalCSS = createGlobalStyle`
  html,
  body:not(.sb-main-centered),
  #root,
  #__next {
    height: 100%;
  }
  html,
  body,
  div,
  span {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .non-selectable {
    ${nonSelectableCSS}
  }
`;

export const fullscreenIFrameCSS = css`
  border: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
