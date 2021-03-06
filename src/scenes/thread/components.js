import React from "react";
import { Card } from "../../components/general/";
import { Header, Loader, Page, Options } from "../../components/ui/";

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

function getCard(board, thread, props) {
  return (item, index) => (
    <Card key={index} {...props} {...item} board={board} thread={thread} />
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
      {items.length === 0
        ? <Loader checkLogin={props.checkLogin} />
        : items.map(getCard(board, thread, props))}
      <Options board={board} thread={thread} />
    </Page>
  );
}
