import React, { PureComponent } from "react";

export default Component =>
  class extends PureComponent {
    componentWillMount() {
      window.scroll(0, 0);
    }
    render() {
      return <Component {...this.props} />;
    }
  };
