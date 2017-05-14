import { createElement, PureComponent } from "react";
import {
  RequestBoardOnMountAndUpdate
} from "../../decorators/requestBoardOnMountAndUpdate";
import { ReceiveThreadsAsProps } from "../../decorators/receiveThreadsAsProps";
import { BindScrollBehavior } from "../../decorators/bindScrollBehavior";
import Component from "./components";

function composeChildren(aFunctionHandler) {
  return RequestBoardOnMountAndUpdate(
    ReceiveThreadsAsProps(BindScrollBehavior(Component, aFunctionHandler))
  );
}

function incrementPage(currentPage) {
  return function() {
    return { page: currentPage + 1 };
  };
}

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.childComponent = composeChildren(this.handleNearBottom);
  }
  handleNearBottom = () => {
    this.setState(incrementPage(this.state.page));
  };
  render() {
    return createElement(this.childComponent, { ...this.props, ...this.state });
  }
}
