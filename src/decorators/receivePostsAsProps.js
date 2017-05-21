import React from "react";
import { connect } from "react-redux";

function mapStateToProps({ Thread }) {
  return { posts: Thread.posts };
}

export default function ReceiveThreadsAsProps(Decorated) {
  return connect(mapStateToProps)(props => <Decorated {...props} />);
}
