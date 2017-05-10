// @flow

import { PureComponent } from "react";

export default class extends PureComponent {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return this.props.children;
  }
}
