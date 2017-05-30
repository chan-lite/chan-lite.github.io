import React, { PureComponent } from "react";
import { connect } from "react-redux";
import scrollTop from "../../decorators/scrollTopOnWillMount";
import Component from "./components";
import { requestSavedPosts } from "../../actions/thread";

/**
 * Redux component.
 */

function mapState({ Thread }) {
  return { posts: Thread.posts };
}

function mapDispatch(dispatch) {
  return {
    requestSavedPosts: ({ board, thread }) =>
      dispatch(requestSavedPosts(board, thread))
  };
}

function connectToSaved(DecoratedComponent) {
  return connect(mapState, mapDispatch)(
    class extends PureComponent {
      componentDidMount() {
        this.props.requestSavedPosts(this.props.match.params);
      }
      render() {
        return <DecoratedComponent prepend="/saved" {...this.props} />;
      }
    }
  );
}

/**
 * Wrapped component.
 */

export default scrollTop(connectToSaved(Component));
