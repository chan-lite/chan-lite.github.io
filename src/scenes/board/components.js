// @flow

import React, { PureComponent } from "react";
import { Page } from "../../components/ui/";
import Thread from "./thread";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false
    };
  }

  componentDidMount() {
    this.props.requestBoard(this.props.match.params.board, this.state.page);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps() {
    this.setState(() => {
      return { loading: false };
    });
  }

  handleScroll = event => {
    if (this.state.loading) return;
    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;

    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - docHeight / 4) {
      const nextPage = this.state.page + 1;
      this.setState(
        () => {
          return { page: nextPage, loading: true };
        },
        () => {
          this.props.requestBoard(this.props.match.params.board, nextPage);
        }
      );
    }
  };

  render() {
    const { threads, match } = this.props;

    const aThreads = typeof threads[`/${match.params.board}`] !== "undefined"
      ? threads[`/${match.params.board}`]
      : [];

    return (
      <Page>
        {aThreads.map(function(thread, index) {
          return index === 0
            ? null
            : <Thread key={index - 1} {...thread} board={match.params.board} />;
        })}
      </Page>
    );
  }
}
