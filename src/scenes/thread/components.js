// @flow

import React from "react";
import { OnMount } from "../../components/general/";
import { Page } from "../../components/ui/";
import OriginalPost from "./originalPost";
import NormalPost from "./normalPost";

type PostObject = any;

type ParamsType = {
  board: string,
  thread: string
};

type MatchType = {
  params: ParamsType
};

type PropsType = {
  match: MatchType,
  requestPosts: Function,
  posts: PostObject
};

export default function(props: PropsType) {
  const { match, requestPosts, posts } = props;
  const { board, thread } = match.params;
  let aPosts = posts[`/${board}/${thread}`];

  if (typeof aPosts === "undefined") {
    aPosts = [];
    requestPosts(board, thread);
  }

  return (
    <OnMount onMount={() => requestPosts(board, thread)}>
      <Page>
        {aPosts.map(function(post, index) {
          return (
            <div key={index}>
              {index === 0 ? OriginalPost(post) : NormalPost(post)}
            </div>
          );
        })}
      </Page>
    </OnMount>
  );
}
