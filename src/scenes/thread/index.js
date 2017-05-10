// @flow

import { connect } from "react-redux";
import Component from "./components";
import { requestPosts } from "../../actions/thread";

function mapStateToProps(state) {
  return {
    posts: state.Thread.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestPosts: (board, thread) => dispatch(requestPosts(board, thread))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
