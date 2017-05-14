import Styled from "styled-components";

export const Container = Styled.div`
  padding: 15px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 748px) {
    padding: 15px 0 0;
  }
`;

export const Row = Styled.div`
   display: flex;
   margin: 0 -7.5px;
   align-items: left;
   justify-content: left;
   flex-direction: row;
   flex-wrap: wrap;
   flex-flow: row wrap;
   align-content: flex-end;
   @media (max-width: 748px) {
     margin-top: -1px;
   }
`;

export const ButtonContainer = Styled.div`
  margin: 0 7.5px 15px;
  width: calc(25% - 15px);
  @media (max-width: 900px) {
    width: calc(33.33% - 15px);
  }
  @media (max-width: 748px) {
    margin-bottom: 0px;
    margin-top: 1px;
  }
  @media (max-width: 700px) {
    width: calc(50% - 15px);
  }
  @media (max-width: 500px) {
    width: calc(100% - 15px);
  }
`;
