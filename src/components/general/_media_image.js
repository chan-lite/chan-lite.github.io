import React, { PureComponent } from "react";
import Styled from "styled-components";
import { findDOMNode } from "react-dom";
import Zooming from "zooming";
// import Animated from "animated/lib/targets/react-dom";
import { IMAGE_BASE } from "../../constants/";

const zooming = new Zooming({
  bgColor: "#212121",
  scaleExtra: 0,
  onBeforeOpen: function(target) {
    // fade image in
    target.style.opacity = "1";
    // fix blocking components
    // const components = document.getElementsByClassName("transition-component");
    // for (let i = 0; i < components.length; ++i) {
    //   const single = components[i];
    //   single.className += " disable-transitions ";
    // }
  },
  onBeforeClose: function(target) {
    // fade image out
    target.style.opacity = "0";
    // fix blocking components
    // const components = document.getElementsByClassName("transition-component");
    // for (let i = 0; i < components.length; ++i) {
    //   const single = components[i];
    //   single.className = single.className.replace(" disable-transitions ", "");
    // }
  }
});

function getHighRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}${Ext}`;
}

function getLowRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}s.jpg`;
}

function saveToStorage(imageSource, event, height, width) {
  // Check if image is already saved
  const check = localStorage.getItem(`chan-lite:image:${imageSource}`);
  if (check !== null) return;
  // Create canvas
  const elephant = event.target;
  const imgCanvas = document.createElement("canvas");
  const imgContext = imgCanvas.getContext("2d");
  // Make sure canvas is as big as the picture
  imgCanvas.width = width;
  imgCanvas.height = height;
  // Draw image into canvas element
  imgContext.drawImage(elephant, 0, 0, width, height);
  // Get canvas contents as a data URL
  const imgAsDataURL = imgCanvas.toDataURL("image/png");
  // Attempt to image into localStorage
  try {
    localStorage.setItem(`chan-lite:image:${imageSource}`, imgAsDataURL);
  } catch (e) {
    clearStorage();
  }
}

function clearStorage() {
  // Remove all images from cache
  const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf("chan-lite:image:") > -1) {
      arr.push(localStorage.key(i));
    }
  }
  for (let i = 0; i < arr.length; i++) {
    localStorage.removeItem(arr[i]);
  }
}

// handleLoad = event => {
//   const check = localStorage.getItem(
//     `chan-lite:local-storage:image:${this.state.imageSource}`
//   );
//   if (check !== null || this.state.hasLoaded) return;

//   const elephant = event.target;
//   const imgCanvas = document.createElement("canvas");
//   const imgContext = imgCanvas.getContext("2d");
//   // Make sure canvas is as big as the picture
//   imgCanvas.width = elephant.width;
//   imgCanvas.height = elephant.height;
//   // Draw image into canvas element
//   imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
//   // Get canvas contents as a data URL
//   const imgAsDataURL = imgCanvas.toDataURL("image/png");
//   // Save image into localStorage
//   try {
//     localStorage.setItem(
//       `chan-lite:local-storage:image:${this.state.imageSource}`,
//       imgAsDataURL
//     );
//   } catch (e) {
//     this.removeImages();
//   }
// };

// removeImages() {
//   // remove all images from cache
//   const arr = [];
//   for (let i = 0; i < localStorage.length; i++) {
//     if (localStorage.key(i).indexOf("chan-lite:local-storage:image:") > -1) {
//       arr.push(localStorage.key(i));
//     }
//   }
//   for (let i = 0; i < arr.length; i++) {
//     localStorage.removeItem(arr[i]);
//   }
// }

function getOfflineImage(imageSource) {
  const image = localStorage.getItem(`chan-lite:image:${imageSource}`);
  return image;
}

function toggleLoading({ hasLoaded }) {
  return { hasLoaded: !hasLoaded };
}

class OfflineImage extends PureComponent {
  element = null;
  state = { hasLoaded: false };

  componentWillReceiveProps({ Tim }) {
    if (Tim !== this.props.Tim) {
      this.setState(toggleLoading);
    }
  }

  // componentDidMount() {
  //   zooming.listen(findDOMNode(this.element));
  // }

  // stopClick = event => {
  //   event.stopPropagation();
  // };

  // handleClick = event => {
  //   zooming.open(findDOMNode(this.element));
  //   this.loadHighRes();
  // };

  // handleOnHover = event => {
  //   this.loadHighRes();
  // };

  // loadHighRes() {
  //   const src = this.state.imageSource.replace(`s.jpg`, `${this.props.Ext}`);
  //   if (
  //     this.state.imageSource === src ||
  //     this.state.hasLoaded ||
  //     !navigator.onLine
  //   ) {
  //     return;
  //   }
  //   this.setState(() => {
  //     return {
  //       hasLoaded: true,
  //       imageSource: src
  //     };
  //   });
  // }

  // handleLoad = event => {
  //   const check = localStorage.getItem(
  //     `chan-lite:local-storage:image:${this.state.imageSource}`
  //   );
  //   if (check !== null || this.state.hasLoaded) return;

  //   const elephant = event.target;
  //   const imgCanvas = document.createElement("canvas");
  //   const imgContext = imgCanvas.getContext("2d");
  //   // Make sure canvas is as big as the picture
  //   imgCanvas.width = elephant.width;
  //   imgCanvas.height = elephant.height;
  //   // Draw image into canvas element
  //   imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);
  //   // Get canvas contents as a data URL
  //   const imgAsDataURL = imgCanvas.toDataURL("image/png");
  //   // Save image into localStorage
  //   try {
  //     localStorage.setItem(
  //       `chan-lite:local-storage:image:${this.state.imageSource}`,
  //       imgAsDataURL
  //     );
  //   } catch (e) {
  //     this.removeImages();
  //   }
  // };

  handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(toggleLoading, () => {
      zooming.open(findDOMNode(this.element));
    });
  };

  handleLowResLoad = event => {
    if (this.state.hasLoaded) return;
    const { Tn_H, Tn_w } = this.props;
    saveToStorage(getLowRes(this.props), event, Tn_H, Tn_w);
  };

  render() {
    const lowResSource = getLowRes(this.props);

    const highResSource = this.state.hasLoaded
      ? getHighRes(this.props)
      : lowResSource;

    const Background = Styled.div`
      background-color: rgba(0, 0, 0, 0.1);
    `;

    const Container = Styled.div`
      overflow: hidden;
      position: relative;
      height: 150px;
    `;

    const ClickableImage = Styled.img`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    const ImageZoomable = Styled.img`
      transition-duration: 150ms;
      opacity: 0;
      background-image: url('${lowResSource}');
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      height: 100vh !important;
      width: 100vw !important;
      object-fit: contain;
    `;

    const OfflineImageSource = Styled.img`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;

    return (
      <Background>
        <Container onClick={this.handleClick}>

          <OfflineImageSource src={getOfflineImage(lowResSource)} />

          {navigator.onLine
            ? <ClickableImage
                crossOrigin="Anonymous"
                onLoad={this.handleLowResLoad}
                src={lowResSource}
              />
            : null}

          {navigator.onLine ? <ClickableImage src={highResSource} /> : null}

          {navigator.onLine
            ? <ImageZoomable
                ref={o => (this.element = o)}
                src={highResSource}
              />
            : null}

        </Container>
      </Background>
    );

    /*return (
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
    );*/
  }
}

export default OfflineImage;
