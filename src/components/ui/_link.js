// @flow

import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Styled from "styled-components";

const Pointer = Styled.div`
  cursor: pointer;
  vertical-align: top;
`;

function Component({ href, children, navigate, style = {} }) {
  return (
    <Pointer style={style} onClick={navigate(href)}>
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
