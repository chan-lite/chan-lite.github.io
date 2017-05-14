// @flow

import { injectGlobal } from "styled-components";

export const GlobalStyles = injectGlobal`
  body {
    margin: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #212121;
    font-family: Arial, sans-serif;
    color: white;
    height: 101vh;
  }
  a {
    color: #81a2be;
  }
  video {
    max-width: 100%;
    max-height: 90vh;
  }
  img {
    width: 100%;
    max-width: 100%;
  }
  .quote {
    color: #789922;
  }
`;
