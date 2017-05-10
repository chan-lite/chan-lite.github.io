// @flow

import React from "react";
import { Page, Link } from "../../components/ui/";

function board({ title, board }, index) {
  return (
    <div key={index}>
      <Link href={`/${board}`}>
        {title}
      </Link>
    </div>
  );
}

export default function({ requestBoards, boards }) {
  if (boards.length === 0) {
    requestBoards();
  }
  return (
    <Page>
      {boards.map(board)}
    </Page>
  );
}
