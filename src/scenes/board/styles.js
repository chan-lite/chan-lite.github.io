import Styled from "styled-components";

export const Page = Styled.div`
  padding: 15px 15px 250px;
  @media (max-width: 748px) {
    padding: 15px 0 0;
  }
`;

export const Container = Styled.div`
  margin: 15px -7.5px 0;
  @media (max-width: 748px) {
    margin-top: 14px;
  }
`;

export const Thread = Styled.div`
  margin: 0 7.5px 15px;
  @media (max-width: 748px) {
    margin-bottom: 0;
    margin-top: 1px
  }
`;
