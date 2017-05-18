import React, { PureComponent } from "react";
import {
  RequestBoardOnMountAndUpdate
} from "../../decorators/requestBoardOnMountAndUpdate";
import { ReceiveThreadsAsProps } from "../../decorators/receiveThreadsAsProps";
import { BindScrollBehavior } from "../../decorators/bindScrollBehavior";
import Component from "./components";

// we override this on mount
// to prevent the tree of components
// re-rendering on page back
let scrollHandler = () => {};

const ChildComponent = RequestBoardOnMountAndUpdate(
  ReceiveThreadsAsProps(
    BindScrollBehavior(Component, () => {
      scrollHandler();
    })
  )
);

function incrementPage({ page }) {
  return { page: page + 1 };
}

export default class extends PureComponent {
  state = { page: 1 };

  componentDidMount() {
    scrollHandler = this.handleNearBottom;
  }

  handleNearBottom = () => {
    this.setState(incrementPage);
  };

  render() {
    return <ChildComponent {...this.props} {...this.state} />;
  }
}
