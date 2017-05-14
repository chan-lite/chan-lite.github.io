// @flow

import React from "react";
import type { Element } from "react";
import Styled from "styled-components";

type PropsType = {
  children?: Element<any>,
  width?: number
};

export default function(props: PropsType) {
  const { children, width } = props;

  const Page = Styled.div`
    max-width: ${width || 600}px;
    margin: 0 auto;
    padding: 15px 15px 250px;
    @media (max-width: 748px) {
      padding: 15px 0 50px;
    }
  `;
  return (
    <Page>
      {children}
    </Page>
  );
}
