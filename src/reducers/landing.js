// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  boards: []
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_BOARDS": {
      return Object.assign({}, state, { boards: action.payload });
    }

    default: {
      return state;
    }
  }
}