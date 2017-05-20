import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Styled from "styled-components";

const Welcome = Styled.h1`
  cursor: pointer;
  display: inline-block;
  margin-top: 0;
  margin-bottom: 15px;

  @media (max-width: 748px) {
    margin-left: 15px;
  }
`;

const Extra = Styled.h1`
  cursor: pointer;
  display: inline-block;
  margin-top: 0;
  margin-bottom: 15px;
  margin-left: 15px;
`;

function WeclomeComponent({ navigate, board, thread }) {
  return (
    <div>
      <Welcome onClick={navigate("/")}>
        Chan Lite {" "}
      </Welcome>

      {board
        ? <Extra onClick={navigate(`/${board}`)}>
            /{board}/
          </Extra>
        : null}

      {thread
        ? <Extra onClick={navigate(`/${board}/${thread}`)}>
            {thread}
          </Extra>
        : null}

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: url => () => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(WeclomeComponent);
