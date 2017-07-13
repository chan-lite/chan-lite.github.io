import React from "react";
import { connect } from "react-redux";
import { lifecycle, withState, compose } from "recompose";
import { requestThreadList } from "../reducers/threadList";
import ThreadList from "../components/threadList";

const board = compose(
  withState("page", "setPage", 1),
  lifecycle({
    componentWillMount: function() {
      const board = this.props.navigation.state.params.board;
      this.props.requestThreadList(board, this.props.page);
    }
  })
)(ThreadList);

function mapState({ ThreadList }) {
  return {
    threads: ThreadList.threads
  };
}

function mapDispatch(dispatch) {
  return {
    requestThreadList: (board, page) => dispatch(requestThreadList(board, page))
  };
}

function navigationOptions({ navigation }) {
  const { title, board } = navigation.state.params;
  return {
    title: `${title} - /${board}/`
  };
}

export default {
  screen: connect(mapState, mapDispatch)(board),
  navigationOptions
};
