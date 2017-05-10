// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  threads: {}
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_THREADS": {
      const aThreads = action.payload.threads.map(data => {
        return data.posts[0];
      });

      const data = {};
      data[action.payload.name] = aThreads;

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: threads });
    }

    case "ADD_THREADS": {
      const aThreads = action.payload.threads.map(data => {
        return data.posts[0];
      });

      const data = {};
      const board = action.payload.name;
      data[board] = state.threads[board].concat(aThreads);

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: threads });
    }

    default: {
      return state;
    }
  }
}
