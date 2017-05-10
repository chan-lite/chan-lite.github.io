// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  posts: {}
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_POSTS": {
      const data = {};
      data[action.payload.name] = action.payload.posts;
      const posts = Object.assign({}, state.posts, data);
      return Object.assign({}, state, { posts: posts });
    }
    default: {
      return state;
    }
  }
}
