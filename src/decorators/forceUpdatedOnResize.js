import React, { PureComponent } from "react";

export function ForceUpdateOnResize(Decorated) {
  return class extends PureComponent {
    componentDidMount() {
      window.addEventListener("resize", () => this.forceUpdate());
    }
    componentWillUnmount() {
      window.removeEventListener("resize", () => this.forceUpdate());
    }
    render() {
      return <Decorated {...this.props} />;
    }
  };
}
