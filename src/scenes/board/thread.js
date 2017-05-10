// @flow

import React from "react";
import Styled from "styled-components";
import { Media } from "../../components/general/";
import { Link } from "../../components/ui/";

const Container = Styled.div`
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 50px;
  padding: 15px 15px 25px;
  border-radius: 3px;
`;

export default function(props) {
  const { no, board, sub, com } = props;

  return (
    <Container>
      <Link href={`/${board}/${no}`}>
        <Media board={board} {...props} />
        <h1>{sub}</h1>
        <article dangerouslySetInnerHTML={{ __html: com }} />
      </Link>
    </Container>
  );
}
