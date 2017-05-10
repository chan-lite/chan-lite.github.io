// @flow

import { connect } from "react-redux";
import Component from "./components";
import { requestBoards } from "../../actions/landing";

function mapStateToProps(state) {
  return {
    boards: state.Landing.boards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestBoards: () => dispatch(requestBoards())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
