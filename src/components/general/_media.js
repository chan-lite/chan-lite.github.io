import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import Styled from "styled-components";
import Zooming from "zooming";
import { BASE } from "../../constants/";

const zooming = new Zooming({
  bgColor: "#1d1f21",
  scaleExtra: 0
});

const IMAGE_BASE = `${BASE}image.php?image=http://i.4cdn.org/`;

const Image = Styled.img`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
`;

class JPEG extends PureComponent {
  element = null;

  componentDidMount() {
    zooming.listen(findDOMNode(this.element));
  }

  handleClick = event => {
    const { ext } = this.props;
    event.target.src = event.target.src.replace(`s${ext}`, `${ext}`);
    event.stopPropagation();
  };

  render() {
    const { tim, ext, board, tn_h, tn_w } = this.props;
    return (
      <Image
        ref={o => (this.element = o)}
        onClick={this.handleClick}
        style={{
          height: `${tn_h}px`,
          width: `${tn_w}px`
        }}
        src={`${IMAGE_BASE}${board}/${tim}s${ext}`}
      />
    );
  }
}

export default function(props) {
  const { ext, board } = props;

  switch (ext) {
    case ".jpg": {
      return <JPEG board={board} {...props} />;
    }
    default: {
      return null;
    }
  }
}
