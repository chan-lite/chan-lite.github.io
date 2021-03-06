// @flow

import { injectGlobal } from "styled-components";

export const GlobalStyles = injectGlobal`
  html {
    /*background-image: url('/background.png');
    background-size: contain;
    background-position: center center;
    background-attachment: fixed;*/
  }
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
  * {
    outline: none !important;
  }
  a {
    color: #81a2be;
  }
  video {
    width: 100%;
  }
  img {
    width: 100%;
    max-width: 100%;
  }
  .inline {
    display: inline-block;
    vertical-align: top;
  }
  .pointer {
    cursor: pointer;
  }
  .quote {
    color: #789922;
  }
  .ms-DocumentCard {
    max-width: 99999999px !important;
    min-width: 0 !important;
    .ms-DocumentCardTitle {
      padding: 15px 15px 0;
      height: auto;
    }
    .ms-DocumentCardActivity {
      padding: 15px;
    }
    .ms-DocumentCardActivity-details {
      top: 15px;
    }
  }
  .postRootContainer {
    .ms-DocumentCard {
      min-width: 0;
      width: 100%;
      max-width: 99999999px;
    }
  }
  .highlightedPost {
    .ms-DocumentCard {
      // border-color: #0078d7;
      // -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 120, 215, 1);
      // -moz-box-shadow: 0px 0px 15px 0px rgba(0, 120, 215, 1);
      // box-shadow: 0px 0px 15px 0px rgba(0, 120, 215, 1);
    }
  }
  .disable-transitions {
    transform: none !important;
  }
`;
