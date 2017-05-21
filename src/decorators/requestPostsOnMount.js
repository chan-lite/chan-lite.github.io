import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { requestPosts } from "../actions/thread";

function map(dispatch) {
  return {
    requestPosts: ({ board, thread }) => dispatch(requestPosts(board, thread))
  };
}

export default Component =>
  connect(null, map)(
    class extends PureComponent {
      componentDidMount() {
        this.props.requestPosts(this.props.match.params);
      }
      render() {
        return <Component {...this.props} />;
      }
    }
  );
