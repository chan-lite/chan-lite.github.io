import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    threads: state.Board.threads
  };
}

export function ReceiveThreadsAsProps(Decorated) {
  return connect(mapStateToProps)(props => <Decorated {...props} />);
}
