import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import Styled, { injectGlobal } from "styled-components";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { IMAGE_BASE } from "../../constants/";
import { DocumentCardActivity } from "office-ui-fabric-react/lib/DocumentCard";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import {
  ContextualMenu,
  DirectionalHint
} from "office-ui-fabric-react/lib/ContextualMenu";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Description } from "./index";

export const cardStyles = injectGlobal`
  .ms-DocumentCardActivity {
    padding: 0 0 15px !important;

    .ms-DocumentCardActivity-details {
      top: 0px;
      left: 40px !important;
    }

    .ms-DocumentCardActivity-avatar {
      &:after {
        border-color: transparent;
      }
    }
  }
  .ms-Image {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const CardContainer = Styled.button`
  display: block;
  border-width: 0;
  text-align: left; 
  width: 100%;
  background-color: #f4f4f4;
  padding: 15px;
  margin-top: 15px;
  &:hover {
    background-color: #eaeaea;
  }
  &:active {
    background-color: #0078d7;
  }
  &:focus {
    outline: 3px dotted #f1f1f1 !important;
  }
  @media (max-width: 748px) {
    margin-top: 2px;
  }
`;

const LargeMediaContainer = Styled.div`
  margin: 0 0 15px;
  @media (max-width: 748px) {
    margin: -15px -15px 15px;
  }
`;

const TextContent = Styled.div`
  display: inline-block;
  vertical-align: top;
  margin-left: 15px;
  width: calc(100% - 90px);
`;

const RepliesContainer = Styled.div`
  color: black;
  position: relative;
  margin-top: 15px;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  button {
    background-color: transparent;
  }
`;

function getHighRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}${Ext}`;
}

function getLowRes({ board, Tim, Ext }) {
  return `${IMAGE_BASE}${board}/${Tim}s.jpg`;
}

function toggleImage(event) {
  event.stopPropagation();
  event.preventDefault();
  return function({ open }) {
    return { open: !open };
  };
}

function scrollTo(element) {
  window.scroll(0, findDOMNode(element).offsetTop);
}

function isHighlighted({ match, No }) {
  return match.params.post === No.toString();
}

function ImageComponent(props) {
  return (
    <a href={getHighRes(props)} onClick={e => e.stopPropagation()}>
      <Image src={getHighRes(props)} />
    </a>
  );
}

function VideoComponent(props) {
  return <video src={getHighRes(props)} controls />;
}

const mediaElements = {
  jpg: ImageComponent,
  png: ImageComponent,
  jpeg: ImageComponent,
  gif: ImageComponent,
  webm: VideoComponent
};
function MediaComponent(props) {
  const Jsx = mediaElements[props.Ext.replace(".", "")];
  return (
    <LargeMediaContainer>
      <Jsx {...props} />
    </LargeMediaContainer>
  );
}

class RepliesComponent extends PureComponent {
  state = { open: false };

  toggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleItemClick = reply => () => {
    this.props.navigate(
      `${this.props.prepend || ""}/${this.props.board}/${this.props.thread}/${reply}`
    );
  };

  render() {
    const id = `replies-btn-${this.props.No}`;

    return (
      <RepliesContainer>
        <DefaultButton
          tabIndex={-1}
          onClick={this.toggleOpen}
          id={id}
          text="Replies"
        />
        {this.state.open
          ? <ContextualMenu
              target={`#${id}`}
              shouldFocusOnMount={false}
              onDismiss={this.toggleOpen}
              directionalHint={DirectionalHint.bottomLeftEdge}
              items={this.props.Replies.map((reply, index) => {
                return {
                  key: index,
                  name: reply,
                  canCheck: true,
                  isChecked: false,
                  onClick: this.handleItemClick(reply)
                };
              })}
            />
          : null}
      </RepliesContainer>
    );
  }
}

const Replies = connect(null, dispatch => ({
  navigate: url => dispatch(push(url))
}))(RepliesComponent);

export default class extends PureComponent {
  state = { open: false };
  element = null;

  componentDidMount() {
    if (isHighlighted(this.props)) {
      scrollTo(this.element);
    }
  }

  componentDidUpdate() {
    if (isHighlighted(this.props)) {
      scrollTo(this.element);
    }
  }

  render() {
    return (
      <CardContainer ref={o => (this.element = o)}>
        {/*large image*/}
        {this.state.open ? <MediaComponent {...this.props} /> : null}
        {/*default content*/}
        {/*image and video*/}
        {this.props.Tim === 0
          ? null
          : <Image
              onClick={e => this.setState(toggleImage(e))}
              src={getLowRes(this.props)}
              width={75}
              height={75}
              className="inline pointer"
              imageFit={ImageFit.cover}
            />}
        {/*text content*/}
        <TextContent
          style={{
            width: this.props.Tim === 0 ? "100%" : "something",
            marginLeft: this.props.Tim === 0 ? "0" : "something"
          }}
        >
          {/*title*/}
          {/*{unescape(this.props.Sub)}*/}
          {/*user data and date*/}
          <DocumentCardActivity
            activity={this.props.Now}
            people={[{ name: unescape(this.props.Name) }]}
          />
          {/*description*/}
          {this.props.Com ? <Description {...this.props} /> : null}
        </TextContent>
        {/*Replies Container*/}
        {this.props.Replies.length > 0 ? <Replies {...this.props} /> : null}
      </CardContainer>
    );
  }
}
