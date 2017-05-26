// @flow

import React from "react";
import type { Element } from "react";
import Styled from "styled-components";

type PropsType = {
  children?: Element<any>
};

const Page = Styled.div`
  padding: 15px 15px 250px;
  max-width: 700px;
  margin: 0 auto;
  @media (max-width: 748px) {
    padding: 0;
    margin-top: -2px;
  }
`;

export default function(props: PropsType) {
  return (
    <Page>
      {props.children}
    </Page>
  );
}
