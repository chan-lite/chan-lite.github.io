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
  margin-bottom: 15px;
  max-width: 100%;
`;

class OfflineImage extends PureComponent {
  element = null;

  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      imageFromLocalStorage: null,
      imageSource: `${IMAGE_BASE}${this.props.board}/${this.props.tim}s.jpg`
    };
  }

  componentDidMount() {
    zooming.listen(findDOMNode(this.element));
  }

  handleClick = event => {
    event.stopPropagation();
  };

  handleOnHover = event => {
    const src = this.state.imageSource.replace(`s.jpg`, `${this.props.ext}`);
    if (
      this.state.imageSource === src ||
      this.state.hasLoaded ||
      !navigator.onLine
    ) {
      return;
    }
    this.setState(() => {
      return {
        hasLoaded: true,
        imageSource: src
      };
    });
  };

  handleLoad = event => {
    const check = localStorage.getItem(
      `react-chan:local-storage:image:${this.state.imageSource}`
    );
    if (check !== null || this.state.hasLoaded) return;

    const elephant = event.target;
    const imgCanvas = document.createElement("canvas");
    const imgContext = imgCanvas.getContext("2d");
    // Make sure canvas is as big as the picture
    imgCanvas.width = elephant.width;
    imgCanvas.height = elephant.height;
    // Draw image into canvas element
    imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
    // Get canvas contents as a data URL
    const imgAsDataURL = imgCanvas.toDataURL("image/png");
    // Save image into localStorage
    try {
      localStorage.setItem(
        `react-chan:local-storage:image:${this.state.imageSource}`,
        imgAsDataURL
      );
    } catch (e) {
      this.removeImages();
    }
  };

  removeImages() {
    // remove all images from cache
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).indexOf("react-chan:local-storage:image:") > -1) {
        arr.push(localStorage.key(i));
      }
    }
    for (let i = 0; i < arr.length; i++) {
      localStorage.removeItem(arr[i]);
    }
  }

  render() {
    let imageSource;
    if (this.state.hasLoaded) {
      imageSource = this.state.imageSource;
    } else {
      const LocalStorageImage = localStorage.getItem(
        `react-chan:local-storage:image:${this.state.imageSource}`
      );
      imageSource = LocalStorageImage || this.state.imageSource;
    }

    return (
      <Image
        crossOrigin="Anonymous"
        onLoad={this.handleLoad}
        ref={o => (this.element = o)}
        style={{ height: `${this.props.tn_h}px` }}
        onMouseEnter={this.handleOnHover}
        onClick={this.handleClick}
        src={imageSource}
      />
    );
  }
}

export default OfflineImage;
