// @flow

import React, { PureComponent } from "react";
import { CHAN_BASE } from "../../constants/";
import OfflineImage from "./_media_image";

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
          src={`${CHAN_BASE}${this.props.board}/${this.props.Tim}${this.props.Ext}`}
          type={`video/${this.props.Ext.replace(".", "")}`}
        />
      </video>
    );
  }
}

type PropsType = {
  board: string,
  Ext?: string,
  Tn_h?: number,
  Tn_w?: number,
  Tim?: number
};

export default function(props: PropsType) {
  switch (props.Ext) {
    case ".png":
    case ".gif":
    case ".jpg": {
      return <OfflineImage board={props.board} {...props} />;
    }
    case ".webm": {
      return <Video board={props.board} {...props} />;
    }
    case undefined: {
      return null;
    }
    default: {
      // console.log(props.Ext);
      return null;
    }
  }
}
