import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { requestBoards } from "../actions/landing";

function mapDispatchToProps(dispatch) {
  return {
    requestBoards: () => dispatch(requestBoards())
  };
}

export function RequestBoardsOnMount(Decorated) {
  return connect(null, mapDispatchToProps)(
    class extends PureComponent {
      componentDidMount() {
        this.props.requestBoards();
      }
      render() {
        return <Decorated {...this.props} />;
      }
    }
  );
}
