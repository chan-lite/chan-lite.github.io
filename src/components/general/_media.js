// @flow

import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import Styled from "styled-components";
import Zooming from "zooming";
import { BASE, CHAN_BASE } from "../../constants/";

const zooming = new Zooming({
  bgColor: "#1d1f21",
  scaleExtra: 0
});

const IMAGE_BASE = `${BASE}image.php?image=${CHAN_BASE}`;

const Image = Styled.img`
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
`;

class JPEG extends PureComponent {
  element = null;
  state = {
    hasLoaded: false
  };

  componentDidMount() {
    zooming.listen(findDOMNode(this.element));
  }

  handleClick = event => {
    event.stopPropagation();
  };

  handleOnHover = event => {
    if (this.state.hasLoaded) return;
    const el = event.target;
    this.setState(
      () => {
        return { hasLoaded: true };
      },
      () => {
        el.src = el.src.replace(`s.jpg`, `${this.props.ext}`);
      }
    );
  };

  render() {
    const { tim, board, tn_h, tn_w } = this.props;

    return (
      <Image
        ref={o => (this.element = o)}
        onMouseEnter={this.handleOnHover}
        onClick={this.handleClick}
        style={{
          height: `${tn_h}px`,
          width: `${tn_w}px`
        }}
        src={`${IMAGE_BASE}${board}/${tim}s.jpg`}
      />
    );
  }
}

class Video extends PureComponent {
  state = {
    controls: false
  };

  handleClick = event => {
    event.stopPropagation();
    const el = event.target;
    if (el.paused || el.ended) {
      event.target.play();
    } else {
      event.target.pause();
    }
  };

  handleOnHover = () => {
    this.setState(() => {
      return { controls: true };
    });
  };

  handleOffHover = () => {
    this.setState(() => {
      return { controls: false };
    });
  };

  render() {
    return (
      <video
        onClick={this.handleClick}
        onMouseEnter={this.handleOnHover}
        onMouseLeave={this.handleOffHover}
        controls={this.state.controls}
      >
        <source
          src={`${CHAN_BASE}${this.props.board}/${this.props.tim}${this.props.ext}`}
          type={`video/${this.props.ext.replace(".", "")}`}
        />
      </video>
    );
  }
}

type PropsType = {
  board: string,
  ext?: string,
  tn_h?: number,
  tn_w?: number,
  tim?: number
};

export default function(props: PropsType) {
  switch (props.ext) {
    case ".png":
    case ".gif":
    case ".jpg": {
      return <JPEG board={props.board} {...props} />;
    }
    case ".webm": {
      return <Video board={props.board} {...props} />;
    }
    case undefined: {
      return null;
    }
    default: {
      console.log(props.ext);
      return null;
    }
  }
}
