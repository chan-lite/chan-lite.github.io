import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { requestBoard } from "../actions/board";

function mapDispatchToProps(dispatch) {
  return {
    requestBoard: (board, page) => dispatch(requestBoard(board, page))
  };
}

export function RequestBoardOnMountAndUpdate(Decorated) {
  return connect(null, mapDispatchToProps)(
    class extends PureComponent {
      componentDidMount() {
        this.props.requestBoard(this.props.match.params.board, this.props.page);
      }
      componentWillReceiveProps(nextProps) {
        if (
          this.props.page !== nextProps.page ||
          this.props.match.params.board !== nextProps.match.params.board
        ) {
          nextProps.requestBoard(nextProps.match.params.board, nextProps.page);
        }
      }
      render() {
        return <Decorated {...this.props} />;
      }
    }
  );
}
