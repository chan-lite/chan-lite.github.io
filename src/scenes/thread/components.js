// @flow

import React, { PureComponent } from "react";
import { Welcome } from "../../components/general/";
import { Page } from "../../components/ui/";
import Post from "./post";

export default class extends PureComponent {
  componentDidMount() {
    this.loadThread(this.props.match.params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.thread !== this.props.match.params.thread) {
      this.loadThread(nextProps.match.params);
    }
    if (nextProps.match.params.post !== this.props.match.params.post) {
      this.props.highlightPost(nextProps.match.params);
    }

    const nextBoard = nextProps.match.params.board;
    const nextThread = nextProps.match.params.board;
    const { board, thread } = this.props.match.params;

    const nextPosts = typeof nextProps.posts[`/${nextBoard}/${nextThread}`] !==
      "undefined"
      ? nextProps.posts[`/${nextBoard}/${nextThread}`]
      : [];

    const posts = typeof this.props.posts[`/${nextBoard}/${nextThread}`] !==
      "undefined"
      ? this.props.posts[`/${nextBoard}/${nextThread}`]
      : [];

    if (
      nextPosts.length === posts.length ||
      (nextBoard !== board || nextThread !== thread)
    ) {
      this.props.highlightPost(nextProps.match.params);
    }
  }

  loadThread({ board, thread }) {
    window.scroll(0, 0);
    this.props.requestPosts(board, thread);
  }

  render() {
    const { match, posts } = this.props;
    const { board, thread } = match.params;
    const aPosts = typeof posts[`/${board}/${thread}`] !== "undefined"
      ? posts[`/${board}/${thread}`]
      : [];

    return (
      <Page>
        <Welcome board={board} thread={thread} />
        {aPosts.map(function(post, index) {
          return <Post key={index} match={match} board={board} {...post} />;
        })}
      </Page>
    );
  }
}
