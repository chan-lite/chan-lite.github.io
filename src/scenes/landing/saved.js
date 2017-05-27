import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Buttons from "./components";
import { Header, Page, Options } from "../../components/ui/";
import { SAVED_LANDING } from "../../constants";

/**
 * Actions.
 */

function setBoards(boards) {
  return {
    type: "SET_SAVED_BOARDS",
    payload: boards
  };
}

function requestSavedBoards() {
  return async function(dispatch, getState) {
    const { token } = getState().Account;
    // Only proceed if a token exists
    if (token) {
      // Build data for request
      const data = new FormData();
      data.append("token", token);
      const options = { method: "POST", body: data };
      // Attemplt request
      try {
        const request = await fetch(SAVED_LANDING, options);
        const { Boards } = await request.json();
        dispatch(setBoards(Boards));
      } catch (err) {
        console.log(err);
      }
    }
  };
}

/**
 * Redux connection.
 */

function attachPrependedLink(board) {
  board.linkPrepend = "/saved/";
  return board;
}

function mapStateToProps({ Landing, Account }) {
  return {
    boards: Landing.savedBoards.map(attachPrependedLink),
    token: Account.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestBoards: () => dispatch(requestSavedBoards())
  };
}

function savedBoardsConnect(Decorated) {
  return connect(mapStateToProps, mapDispatchToProps)(
    class extends PureComponent {
      componentDidMount() {
        this.props.requestBoards();
      }
      componentWillReceiveProps({ token }) {
        if (!this.props.token && token !== this.props.token) {
          this.props.requestBoards();
        }
      }
      render() {
        return <Decorated {...this.props} />;
      }
    }
  );
}

/**
 * Main component.
 */

const Boards = savedBoardsConnect(Buttons);

export default function() {
  return (
    <Page>
      <Header items={[{ text: "/chanlite/", href: "/" }]} />
      <Boards />
      <Options />
    </Page>
  );
}
