import React from "react";
import { Page } from "./styles";
import { Card } from "../../components/general/";
import { Header, Loader } from "../../components/ui/";

/**
 * Helper functions
 */
function getHeaderItems(board, thread) {
  return [
    { text: "/chanlite/", href: "/" },
    { text: `/${board}/`, href: `/${board}` },
    { text: `/${thread}/`, href: `/${board}/${thread}` }
  ];
}

function getCard(board, props) {
  return (item, index) => (
    <Card key={index} {...props} {...item} board={board} />
  );
}

/**
 * Container componnet
 */
export default function(props) {
  const { match, posts } = props;
  const { board, thread } = match.params;
  const items = posts[`/${board}/${thread}`] || [];

  return (
    <Page>
      <Header items={getHeaderItems(board, thread)} />
      {items.length === 0 ? <Loader /> : items.map(getCard(board, props))}
    </Page>
  );
}
