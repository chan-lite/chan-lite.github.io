import React, { PureComponent } from "react";

export default function(DecoratedComponent) {
  return class extends PureComponent {
    componentDidMount() {
      window.scrollTo(0, 0);
    }
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  };
}
