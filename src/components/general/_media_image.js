import React, { PureComponent } from "react";
import Styled from "styled-components";
import { findDOMNode } from "react-dom";
import Zooming from "zooming";
import { IMAGE_BASE } from "../../constants/";

const Image = Styled.img`
  display: none;
`;

const FakeImage = Styled.div`
  background-position: center center;
  background-size: cover;
`;

const FakeImageClickable = Styled.img`
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const zooming = new Zooming({
  bgColor: "#212121",
  scaleExtra: 0,
  onBeforeOpen: function(target) {
    target.style.display = "block";
    const components = document.getElementsByClassName("transition-component");
    for (let i = 0; i < components.length; ++i) {
      const single = components[i];
      single.className = single.className + " disable-transitions ";
    }
  },
  onClose: function(target) {
    target.style.display = "none";
  },
  onBeforeClose: function() {
    const components = document.getElementsByClassName("transition-component");
    for (let i = 0; i < components.length; ++i) {
      const single = components[i];
      single.className = single.className.replace(" disable-transitions ", "");
    }
  }
});

function getImageStateFromProps(props) {
  return {
    hasLoaded: false,
    imageFromLocalStorage: null,
    imageSource: `${IMAGE_BASE}${props.board}/${props.Tim}s.jpg`
  };
}

class OfflineImage extends PureComponent {
  element = null;

  constructor(props) {
    super(props);
    this.state = getImageStateFromProps(props);
  }

  componentDidMount() {
    zooming.listen(findDOMNode(this.element));
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => {
      return getImageStateFromProps(nextProps);
    });
  }

  stopClick = event => {
    event.stopPropagation();
  };

  handleClick = event => {
    zooming.open(findDOMNode(this.element));
    this.loadHighRes();
  };

  handleOnHover = event => {
    this.loadHighRes();
  };

  loadHighRes() {
    const src = this.state.imageSource.replace(`s.jpg`, `${this.props.Ext}`);
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
  }

  handleLoad = event => {
    const check = localStorage.getItem(
      `chan-lite:local-storage:image:${this.state.imageSource}`
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
        `chan-lite:local-storage:image:${this.state.imageSource}`,
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
      if (localStorage.key(i).indexOf("chan-lite:local-storage:image:") > -1) {
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
        `chan-lite:local-storage:image:${this.state.imageSource}`
      );
      imageSource = LocalStorageImage || this.state.imageSource;
    }

    const FakeImageStyle = {
      backgroundImage: `url(${imageSource})`,
      height: `${this.props.imageHeight || 150}px`
    };

    return (
      <div onClick={this.stopClick}>
        <div style={{ height: "0", overflow: "hidden" }}>
          <Image
            crossOrigin="Anonymous"
            onLoad={this.handleLoad}
            ref={o => (this.element = o)}
            onMouseEnter={this.handleOnHover}
            src={imageSource}
          />
        </div>
        <div style={{ position: "relative" }}>
          <FakeImage onClick={this.handleClick} style={FakeImageStyle} />
          <FakeImageClickable
            style={{ height: `${this.props.imageHeight || 150}px` }}
            onClick={this.handleClick}
            src={imageSource}
          />
        </div>
      </div>
    );
  }
}

export default OfflineImage;
