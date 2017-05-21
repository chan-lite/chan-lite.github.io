// @flow

import React, { PureComponent } from "react";
import Styled from "styled-components";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { push } from "react-router-redux";

const Article = Styled.article`
  overflow: hidden;
  color: black;
`;

type PropsType = {
  Board: string,
  Ext?: string,
  Tn_h?: number,
  Tn_w?: number,
  Tim?: number,
  match: Object
};

class Description extends PureComponent {
  props: PropsType;
  element: null;

  componentDidMount() {
    this.checkLinks();
  }

  componentDidUpdate() {
    this.checkLinks();
  }

  componentWillUnmount() {
    this.getQuotes().forEach(quoteNode => {
      quoteNode.removeEventListener("click", this.handleClick);
    });
  }

  checkLinks() {
    this.getQuotes().forEach(quoteNode => {
      quoteNode.addEventListener("click", this.handleClick);
    });
  }

  getQuotes() {
    const el = findDOMNode(this.element);
    const nodes = el.querySelectorAll(".quotelink");
    return Array.prototype.slice.call(nodes);
  }

  getUrlFromHref(href) {
    if (href.indexOf("/thread/") > -1) {
      const parts = href.split("/thread/");
      const boardParts = parts[0].split("/");
      const board = boardParts[boardParts.length - 1];
      const threadParts = parts[1].split("#");
      const thread = threadParts[0];
      const postParts = threadParts[1];
      const post = postParts.replace("p", "");
      return `/${board}/${thread}/${post}`;
    } else {
      const postParts = href.split("#p");
      const post = postParts[postParts.length - 1];
      const { board, thread } = this.props.match.params;
      return `/${board}/${thread}/${post}`;
    }
  }

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const url = this.getUrlFromHref(event.target.href);
    this.props.navigate(url);
  };

  render() {
    return (
      <Article
        ref={o => (this.element = o)}
        dangerouslySetInnerHTML={{ __html: this.props.Com }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: url => dispatch(push(url))
  };
}

export default connect(null, mapDispatchToProps)(Description);
