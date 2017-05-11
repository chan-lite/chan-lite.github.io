// @flow

import { connect } from "react-redux";
import Component from "./components";
import { requestPosts, highlightPost } from "../../actions/thread";

function mapStateToProps(state) {
  return {
    posts: state.Thread.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: (board, thread) => dispatch(requestPosts(board, thread)),
    highlightPost: params => dispatch(highlightPost(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
