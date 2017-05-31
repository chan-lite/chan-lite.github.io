import Styled, { injectGlobal } from "styled-components";

export const landingStyles = injectGlobal`
  .buttonRootContainer {
    .ms-SearchBox {
      margin-bottom: 15px;
      border-color: #f4f4f4;
      border-width: 2px;
      @media (max-width: 748px) {
        border-width: 0;
        margin: 0;
        height: 50px !important;
      }
      .ms-Icon {
        font-weight: 800;
        color: #f4f4f4;
      }
      .ms-SearchBox-field {
        font-weight: 800;
        color: white;
      }
    }
    .ms-Button--compound {
      &:focus {
        outline: 3px dotted #f1f1f1 !important;
      }
      width: 100%;
      max-width: 99999px;
      overflow: hidden;
      margin-top: 0px;
      margin-bottom: 0px;

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

export const Page = Styled.div`
  padding: 15px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 748px) {
    padding: 0;
    margin-top: -2px;
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
     margin: -2px 0 0;
   }
`;

export const ButtonContainer = Styled.div`
  margin: 0 7.5px 15px;
  width: calc(25% - 15px);
  @media (max-width: 900px) {
    width: calc(33.33% - 15px);
  }
  @media (max-width: 748px) {
    width: calc(50% - 1px);
    margin: 2px 0 0 0;

    &:nth-of-type(2n+1) {
      margin-right: 1px;
    }
    &:nth-of-type(2n) {
      margin-left: 1px;
    }
    
  }
`;
