// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  boards: [],
  savedBoards: []
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_BOARDS": {
      return Object.assign({}, state, {
        boards: action.payload.map(({ Board, Title }) => {
          return {
            board: Board,
            title: Title
          };
        })
      });
    }

    case "SET_SAVED_BOARDS": {
      return Object.assign({}, state, {
        savedBoards: action.payload.map(({ Board, Title }) => {
          return {
            board: Board,
            title: Title
          };
        })
      });
    }

    default: {
      return state;
    }
  }
}
