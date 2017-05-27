import React from "react";
import { Card } from "../../components/general/";
import { Header, Loader, Link, Page, Options } from "../../components/ui/";

/**
 * Helper functions
 */
function getHeaderItems(board) {
  return [
    { text: "/chanlite/", href: "/" },
    { text: `/${board}/`, href: `/${board}` }
  ];
}

function getCard(board, props) {
  return (item, index) => (
    <Link key={index} href={`/${board}/${item.No}`}>
      <Card {...item} {...props} board={board} />
    </Link>
  );
}

/**
 * Container component
 */
export default function(props) {
  const { match, threads } = props;
  const board = match.params.board;
  const items = threads[`/${board}`] || [];

  return (
    <Page>
      <Header items={getHeaderItems(board)} />
      {items.length === 0 ? <Loader /> : items.map(getCard(board, props))}
      <Options />
    </Page>
  );
}
