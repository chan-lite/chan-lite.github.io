import React from "react";
import Styled from "styled-components";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

const Wrap = Styled.div`
  padding-top: 150px;
`;

export default function() {
  return (
    <Wrap>
      <Spinner size={SpinnerSize.large} />
    </Wrap>
  );
}
