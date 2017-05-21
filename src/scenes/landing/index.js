import React from "react";
import { RequestBoardsOnMount } from "../../decorators/requestBoardsOnMount";
import { ReceiveBoardsAsProps } from "../../decorators/receiveBoardsAsProps";
import Buttons from "./components";
import { Header } from "../../components/ui/";
import { Page } from "./styles";

const Boards = RequestBoardsOnMount(ReceiveBoardsAsProps(Buttons));

export default function() {
  return (
    <Page>
      <Header items={[{ text: "/chanlite/", href: "/" }]} />
      <Boards />
    </Page>
  );
}
