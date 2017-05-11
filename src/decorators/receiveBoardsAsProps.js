import React, { PureComponent } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    boards: state.Landing.boards
  };
}

export function ReceiveBoardsAsProps() {
  return Decorated => {
    return connect(mapStateToProps)(function(props) {
      return <Decorated {...props} />;
    });
  };
}
