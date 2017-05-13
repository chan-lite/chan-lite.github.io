import Styled, { injectGlobal } from "styled-components";

export const Title = Styled.div`
  margin: 0 0 10px;
`;
export const Container = Styled.div`
  padding: 50px 15px 250px;
  max-width: 800px;
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

export const ButtonContainer = Styled.div`
  margin: 0 7.5px 15px;
  width: calc(25% - 15px);
  @media (max-width: 900px) {
    width: calc(33.33% - 15px);
  }
  @media (max-width: 700px) {
    width: calc(50% - 15px);
  }
  @media (max-width: 500px) {
    width: calc(100% - 15px);
  }
`;

injectGlobal`
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
`;
