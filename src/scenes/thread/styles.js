import Styled from "styled-components";

export const Page = Styled.div`
  padding: 15px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 748px) {
    padding: 0;
  }
`;

export const CardContainer = Styled.div`
  margin-bottom: 15px;
  @media (max-width: 748px) {
    margin: 2px 0 0 0;
  }
`;
