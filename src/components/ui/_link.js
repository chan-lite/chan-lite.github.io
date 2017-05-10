// @flow

import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Styled from "styled-components";

const Pointer = Styled.div`
  cursor: pointer;
`;

function Component({ href, children, navigate }) {
  return (
    <Pointer onClick={navigate(href)}>
      {children}
    </Pointer>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: url => () => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(Component);
