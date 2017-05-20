import React from "react";
import { connect } from "react-redux";

function mapStateToProps({ Landing }) {
  return {
    boards: Landing.boards
  };
}

// navigator.onLine

export function ReceiveBoardsAsProps(Decorated) {
  return connect(mapStateToProps)(props => <Decorated {...props} />);
}
