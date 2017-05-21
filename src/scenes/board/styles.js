import Styled, { injectGlobal } from "styled-components";

export const boardStyles = injectGlobal`
  .threadRootContainer {
    article {
      max-height: 145px;
    }
  }

  .ms-ListBasicExample-itemImage {
    width: 75px !important;
    height: 75px !important;
  }

  .ms-ListBasicExample-itemImage,
  .ms-ListBasicExample-itemContent {
    display: inline-block;
    vertical-align: top;
  }
  .ms-ListBasicExample-itemContent {
    margin-left: 15px;
    width: calc(100% - 90px);
  }
  .ms-List-cell {
    padding-top: 15px;

    @media (max-width: 748px) {
      padding-top: 2px;
    }

    .ms-DocumentCardActivity {
      padding: 0 0 15px;

      .ms-DocumentCardActivity-details {
        top: 0;
        left: 40px;
      }

      .ms-DocumentCardActivity-avatar {
        &:after {
          border-color: transparent;
        }
      }
    }
    
    > div {
      background-color: #f4f4f4;
      padding: 15px;
      &:hover {
        background-color: #eaeaea;
      }
      &:active {
        background-color: #0078d7;
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

export const Container = Styled.div`
  margin: -15px 0 0;
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
