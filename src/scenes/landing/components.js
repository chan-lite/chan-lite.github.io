// @flow

import React from "react";
import Styled from "styled-components";
import { Page, Link } from "../../components/ui/";

const Button = Styled.div`
  cursor: pointer;
  display: inline-block;
  margin: 0 7.5px 15px;
  width: calc(33.33% - 45px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px;
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
`;

const Text = Styled.div`
  font-size: 12px;
  padding: 10px 15px;
  font-weight: 800;
`;

function board({ title, board }, index) {
  return (
    <Button key={index}>
      <Link href={`/${board}`}>
        <Text>
          {title}
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
    <Page width={800}>
      {boards.map(board)}
    </Page>
  );
}
