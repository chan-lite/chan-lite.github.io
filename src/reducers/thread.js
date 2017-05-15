// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  posts: {}
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_POSTS": {
      const somePosts = action.payload.posts.map(aPost => {
        aPost["highlighted"] = false;
        return aPost;
      });

      const data = {};
      data[action.payload.name] = somePosts;
      const posts = Object.assign({}, state.posts, data);
      return Object.assign({}, state, { posts: posts });
    }
    case "HIGHLIGHT_POST": {
      const { board, thread, post } = action.payload;
      const posts = state.posts[`/${board}/${thread}`].map(aPost => {
        aPost["highlighted"] = aPost.No.toString() === post ? true : false;
        return aPost;
      });
      const data = state.posts;
      data[action.payload.name] = posts;
      return Object.assign({}, state, { posts: data });
    }
    default: {
      return state;
    }
  }
}
