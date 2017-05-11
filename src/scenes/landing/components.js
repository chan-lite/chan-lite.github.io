// @flow

import React from "react";
import Styled from "styled-components";
import { Welcome } from "../../components/general/";
import { Page, Link } from "../../components/ui/";

const Row = Styled.div`
  margin: 0 -7.5px;
`;

const Clear = Styled.div`
  clear: both;
`;

const Button = Styled.div`
  cursor: pointer;
  width: calc(33.33% - 15px);
  float: left;
  margin: 0 7.5px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  transition-duration: 150ms;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 748px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`;

const Text = Styled.div`
  font-size: 18px;
  padding: 10px 15px;
  font-weight: 800;
`;

function board({ board }, index) {
  return (
    <Button key={index}>
      <Link href={`/${board}`}>
        <Text>
          /{board}/
        </Text>
      </Link>
    </Button>
  );
}

type BoardsType = any;

type PropsType = {
  requestBoards: Function,
  boards: BoardsType
};

export default function(props: PropsType) {
  const { requestBoards, boards } = props;
  if (boards.length === 0) {
    requestBoards();
  }
  return (
    <Page>
      <Welcome />
      <Row>
        {boards.map(board)}
      </Row>
      <Clear />
    </Page>
  );
}
