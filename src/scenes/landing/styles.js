import Styled from "styled-components";

export const Title = Styled.h1`
  margin: 0 0 15px;
`;
export const Container = Styled.div`
  padding: 50px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
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
`;

export const Button = Styled.div`
  margin: 0 7.5px 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  width: calc(25% - 45px);

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: 900px) {
    width: calc(33.33% - 45px);
  }
  
  @media (max-width: 700px) {
    width: calc(50% - 45px);
  }
  
  @media (max-width: 500px) {
    width: calc(100% - 45px);
  }
`;
