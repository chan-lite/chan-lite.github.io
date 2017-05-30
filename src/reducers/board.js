// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  threads: {},
  savedThreads: {}
};

function getPostsFromThread({ Posts }) {
  const post = Posts[0];
  post.Replies = [];
  return post;
}

function filter(threads) {
  const uniqueThreads = [];
  for (let e = 0; e < threads.length; e++) {
    const current = threads[e];
    const count = uniqueThreads.filter(({ No }) => No === current.No);
    if (count.length === 0) {
      uniqueThreads.push(current);
    }
  }
  return uniqueThreads;
}

function uniqueThreads(threadsObj) {
  for (const key in threadsObj) {
    if (threadsObj.hasOwnProperty(key)) {
      threadsObj[key] = filter(threadsObj[key]);
    }
  }
  return threadsObj;
}

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

      const data = {};
      data[action.payload.name] = aThreads;

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: uniqueThreads(threads) });
    }

    case "ADD_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

      const data = {};
      const board = action.payload.name;
      data[board] = state.threads[board].concat(aThreads);

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: uniqueThreads(threads) });
    }

    case "SET_SAVED_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

      const data = {};
      const board = action.payload.name;
      data[board] = (state.savedThreads[board] || []).concat(aThreads);

      const threads = Object.assign({}, state.savedThreads, data);
      return Object.assign({}, state, { savedThreads: uniqueThreads(threads) });
    }

    case "ADD_SAVE_THREADS": {
      const aThreads = action.payload.threads.map(getPostsFromThread);

      const data = {};
      const board = action.payload.name;
      data[board] = state.savedThreads[board].concat(aThreads);

      const threads = Object.assign({}, state.savedThreads, data);
      return Object.assign({}, state, { savedThreads: uniqueThreads(threads) });
    }

    default: {
      return state;
    }
  }
}
