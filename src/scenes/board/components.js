// @flow

import React, { PureComponent } from "react";
import Styled from "styled-components";
import { Welcome } from "../../components/general/";
import { Page } from "../../components/ui/";
import Thread from "./thread";

type StateType = {
  page: number,
  loading: boolean
};

const Row = Styled.div`
  margin: 0 -7.5px;
`;

export default class extends PureComponent {
  state: StateType = {
    page: 1,
    loading: false
  };

  componentDidMount() {
    window.scroll(0, 0);
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

  handleScroll = () => {
    if (!document.body || !document.documentElement) {
      throw new Error(
        "Cannot find `body` or `documentElement` on the `document` object."
      );
    } else if (this.state.loading) {
      return;
    }

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

    if (windowBottom >= docHeight * 3 / 4) {
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
        <Welcome board={match.params.board} />
        <Row>
          {aThreads.map(function(thread, index) {
            return index === 0
              ? null
              : <Thread
                  match={match}
                  key={index - 1}
                  {...thread}
                  board={match.params.board}
                />;
          })}
        </Row>
      </Page>
    );
  }
}
