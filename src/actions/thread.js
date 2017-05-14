// @flow

import { GET_POSTS } from "../constants/";
import type { DispatchType } from "./types";

function setPosts(data) {
  return {
    type: "SET_POSTS",
    payload: data
  };
}

export function requestPosts(board: string, thread: string) {
  return async function(dispatch: DispatchType) {
    try {
      const response = await fetch(GET_POSTS(board, thread));
      const { Posts } = await response.json();
      const data = {
        name: `/${board}/${thread}`,
        posts: Posts
      };
      dispatch(setPosts(data));
    } catch (err) {
      // console.log(err);
    }
  };
}

export function highlightPost(params) {
  return {
    type: "HIGHLIGHT_POST",
    payload: params
  };
}
