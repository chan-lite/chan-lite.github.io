import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { BindScrollBehavior } from "../../decorators/bindScrollBehavior";
import ScrollTopOnMount from "../../decorators/scrolltop";
import Component from "./components";
import { requestSavedBoards } from "../../actions/board";

// HOC start

function mapState({ Board, Account }) {
  return {
    threads: Board.savedThreads,
    token: Account.token
  };
}

function mapDispatch(dispatch) {
  return {
    requestSavedBoards: (board, page, perPage) =>
      dispatch(requestSavedBoards(board, page, perPage))
  };
}

function GetSavedThreads(DecoratedComponent) {
  return connect(mapState, mapDispatch)(
    class extends PureComponent {
      componentDidMount() {
        this.request();
      }
      componentWillReceiveProps({ page, token }) {
        if (page !== this.props.page) {
          this.request();
        } else if (token !== this.props.token) {
          this.request();
        }
      }
      request = () => {
        const board = this.props.match.params.board;
        const page = this.props.page;
        const perPage = 15;
        this.props.requestSavedBoards(board, page, perPage);
      };
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}

// HOC end

// we override this on mount
// to prevent the tree of components
// re-rendering on page back
let scrollHandler = () => {};

const ChildComponent = ScrollTopOnMount(
  GetSavedThreads(
    BindScrollBehavior(Component, () => {
      scrollHandler();
    })
  )
);

function incrementPage({ page }) {
  return { page: page + 1 };
}

export default class extends PureComponent {
  state = { page: 1 };

  componentDidMount() {
    scrollHandler = () => this.setState(incrementPage);
  }

  render() {
    return (
      <ChildComponent
        checkLogin={true}
        prepend="/saved"
        {...this.props}
        {...this.state}
      />
    );
  }
}
