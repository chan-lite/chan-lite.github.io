import React from "react";
import Styled from "styled-components";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

const Wrap = Styled.div`
  padding-top: 150px;
  overflow: hidden;
`;

export default function() {
  return (
    <Wrap>
      <Spinner
        size={SpinnerSize.large}
        label={navigator.onLine ? null : "You appear to be offline"}
      />
    </Wrap>
  );
}
