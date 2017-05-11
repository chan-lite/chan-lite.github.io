import React, { PureComponent } from "react";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    requestBoards: () => dispatch(requestBoards())
  };
}

export function RequestBoardsOnMount() {
  return Decorated => {
    return connect(null, mapDispatchToProps)(
      class extends PureComponent {
        componentDidMount() {
          this.props.requestBoards();
        }
        render() {
          return <Decorated {...this.props} boards={this.props.boards} />;
        }
      }
    );
  };
}
