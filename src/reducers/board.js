// @flow

import { flatten } from "lodash";
import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  threads: {}
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_THREADS": {
      const aThreads = flatten(
        action.payload.threads.map(data => data.threads)
      );

      const data = {};
      data[action.payload.name] = aThreads;

      const threads = Object.assign({}, state.threads, data);

      return Object.assign({}, state, { threads: threads });
    }

    default: {
      return state;
    }
  }
}
