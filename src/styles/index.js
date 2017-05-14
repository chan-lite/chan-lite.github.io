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

  .postRootContainer {
    .ms-DocumentCard {
      min-width: 0;
      width: 100%;
      max-width: 99999999px;
    }
  }
  
  .highlightedPost {
    .ms-DocumentCard {
      border-color: #0078d7;
      -webkit-box-shadow: 0px 0px 15px 0px rgba(0,120,215,1);
      -moz-box-shadow: 0px 0px 15px 0px rgba(0,120,215,1);
      box-shadow: 0px 0px 15px 0px rgba(0,120,215,1);
    }
  }
  
  .buttonRootContainer  {

    .ms-SearchBox {
      margin-bottom: 15px;

      .ms-SearchBox-field {
        color: white;
      }
    }

    .ms-Button--compound {
      width: 100%;
      max-width: 99999px;
      overflow: hidden;

      .ms-Button-label {
        margin-bottom: 0;
        padding-bottom: 5px;
      }

      .ms-Button-label,
      .ms-Button-description {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  
  .ms-Breadcrumb {
    margin: 0 0 15px !important;

    .ms-Breadcrumb-chevron {
      margin: 0 15px;
      color: white;
      margin-top: 10px;

      @media (max-width: 640px) {
        margin-top: 8px;
        margin-left: 0;
        margin-right: 0;
      }
    }

    .ms-Link {
      padding: 0 15px 5px !important;
      color: white !important;

      &:hover {
        color: black !important;
      }
    }
  }
`;
