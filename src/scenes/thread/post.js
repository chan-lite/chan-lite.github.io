// @flow

import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import { Media, Description } from "../../components/general/";
import { Container } from "../../components/ui/";

export default class extends PureComponent {
  componentDidMount() {
    if (this.props.highlighted) {
      const el = findDOMNode(this.element);
      window.scroll(0, el.offsetTop);
    }
  }

  render() {
    const style = !this.props.highlighted
      ? {}
      : {
          backgroundColor: "rgba(255, 255, 255, 0.2)"
        };

    return (
      <Container style={style} ref={o => (this.element = o)}>
        <Media {...this.props} />
        <Description {...this.props} />
      </Container>
    );
  }
}
