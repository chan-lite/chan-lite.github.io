// @flow

import React from "react";
import { OnMount } from "../../components/general/";
import { Page } from "../../components/ui/";
import Thread from "./thread";

export default function({ threads, match, requestBoard }) {
  const { board } = match.params;
  let aThreads = threads[`/${board}`];

  if (typeof aThreads === "undefined") {
    aThreads = [];
    requestBoard(match.params.board);
  }

  return (
    <OnMount onMount={() => requestBoard(match.params.board)}>
      <Page>
        {aThreads.map(function(thread, index) {
          return index === 0
            ? null
            : <Thread key={index - 1} {...thread} board={board} />;
        })}
      </Page>
    </OnMount>
  );
}
