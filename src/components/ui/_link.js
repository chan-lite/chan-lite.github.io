// @flow

import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Styled from "styled-components";

const StyledSpan = Styled.span`
  display: inline-block;
  color: #81a2be;
  cursor: pointer;
`;

function Component({ href, children, navigate }) {
  return (
    <StyledSpan onClick={navigate(href)}>
      {children}
    </StyledSpan>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: url => () => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(Component);
