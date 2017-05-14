import Styled, { injectGlobal } from "styled-components";

export const Page = Styled.div`
  padding: 15px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
`;

export const CardContainer = Styled.div`
  margin-bottom: 15px;
`;

injectGlobal`
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
`;
