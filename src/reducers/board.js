// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  threads: {}
};

function getPostsFromThread({ Posts }) {
  const post = Posts[0];
  post.Replies = [];
  return post;
}

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

      const data = {};
      data[action.payload.name] = aThreads;

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: threads });
    }

    case "ADD_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

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
