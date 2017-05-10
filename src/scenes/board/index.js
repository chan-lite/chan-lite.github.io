// @flow

import { connect } from "react-redux";
import Component from "./components";
import { requestBoard } from "../../actions/board";

function mapStateToProps(state) {
  return {
    threads: state.Board.threads
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestBoard: board => dispatch(requestBoard(board))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);