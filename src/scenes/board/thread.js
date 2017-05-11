// @flow

import React from "react";
import Styled from "styled-components";
import { Media, Description } from "../../components/general/";
import { Link, Container } from "../../components/ui/";

type PropsType = {
  no: number,
  board: string,
  sub: string,
  com: string,
  match: Object
};

const ContainerWithHover = Styled(Container)`
  transition-duration: 150ms;
  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export default function(props: PropsType) {
  const { no, board, sub } = props;

  return (
    <Link href={`/${board}/${no}`}>
      <ContainerWithHover>
        <Media {...props} />
        <h1>{sub}</h1>
        <Description {...props} />
      </ContainerWithHover>
    </Link>
  );
}
