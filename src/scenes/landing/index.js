// @flow

import React, { PureComponent } from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { requestBoards } from "../../actions/landing";
import { Link } from "../../components/ui/";
import BoardLinks from "./boardLinks";

const Title = Styled.h1`
  margin: 0 0 15px;
`;

const Container = Styled.div`
  padding: 50px 15px 250px;
  max-width: 600px;
  margin: 0 auto;
`;

class Component extends PureComponent {
  componentDidMount() {
    this.props.requestBoards();
  }

  render() {
    return <BoardLinks boards={this.props.boards} />;
  }
}

function mapStateToProps(state) {
  return {
    boards: state.Landing.boards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestBoards: () => dispatch(requestBoards())
  };
}

const BoardLinksConnected = connect(mapStateToProps, mapDispatchToProps)(
  Component
);

export { BoardLinksConnected };

export default function() {
  return (
    <Container>
      <Link href="/">
        <Title>React Chan</Title>
      </Link>
      <BoardLinksConnected />
    </Container>
  );
}
