import React, { PureComponent } from "react";
import Styled from "styled-components";
import { RequestBoardsOnMount } from "../../decorators/requestBoardsOnMount";
import { ReceiveBoardsAsProps } from "../../decorators/ReceiveBoardsAsProps";
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

@RequestBoardsOnMount()
@ReceiveBoardsAsProps()
class WithBoards extends PureComponent {
  render() {
    return <BoardLinks {...this.props} />;
  }
}

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
