import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import { Media, Description } from "../../components/general/";
import { Container } from "../../components/ui/";
import { Card } from "../../components/general/";
import { CardContainer } from "./styles";

export default class extends PureComponent {
  componentDidMount() {
    this.checkScroll();
  }

  componentDidUpdate() {
    this.checkScroll();
  }

  isHighlighted() {
    return this.props.match.params.post === this.props.item.no.toString();
  }

  checkScroll() {
    if (this.isHighlighted()) {
      const el = findDOMNode(this.element);
      window.scroll(0, el.offsetTop);
    }
  }

  render() {
    const className = this.isHighlighted() ? "highlightedPost" : null;

    return (
      <div className={className} ref={o => (this.element = o)}>
        <CardContainer className="postRootContainer">
          <Card
            match={this.props.match}
            imageHeight={250}
            board={this.props.board}
            item={this.props.item}
          />
        </CardContainer>
      </div>
    );
  }
}
