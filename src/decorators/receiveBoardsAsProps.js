import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    boards: state.Landing.boards
  };
}

export function ReceiveBoardsAsProps(Decorated) {
  return connect(mapStateToProps)(props => <Decorated {...props} />);
}
