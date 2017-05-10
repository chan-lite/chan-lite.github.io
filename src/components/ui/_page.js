// @flow

import React from "react";
import Styled from "styled-components";

export default function({ children, width }) {
  const Page = Styled.div`
    max-width: ${width || 600}px;
    margin: 0 auto;
    padding: 50px 15px 250px;
    @media (max-width: 748px) {
      padding-top: 15px;
      padding-bottom: 50px;
    }
  `;
  return (
    <Page>
      {children}
    </Page>
  );
}
