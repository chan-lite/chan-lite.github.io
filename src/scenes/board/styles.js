import Styled, { injectGlobal } from "styled-components";

injectGlobal`
  .threadRootContainer {
    article {
      max-height: 145px;
    }
  }
`;

export const Page = Styled.div`
  padding: 15px 15px 250px;
  @media (max-width: 748px) {
    padding: 0;
  }
`;

export const Container = Styled.div`
  margin: 15px -7.5px 0;
  @media (max-width: 748px) {
    margin: 0;
  }
`;

export const Thread = Styled.div`
  margin: 0 7.5px 15px;
  @media (max-width: 748px) {
    margin: 2px 0 0;
    &:first-child {
      margin-top: 0;
    }
  }
`;
