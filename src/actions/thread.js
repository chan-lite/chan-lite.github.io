// @flow

import { GET_POSTS } from "../constants/";
import type { DispatchType } from "./types";

function setPosts(data) {
  return {
    type: "SET_POSTS",
    payload: data
  };
}

export function requestPosts(board, thread) {
  return async function(dispatch: DispatchType) {
    try {
      const response = await fetch(GET_POSTS(board, thread));
      const { posts } = await response.json();
      const data = {
        name: `/${board}/${thread}`,
        posts: posts
      };
      dispatch(setPosts(data));
    } catch (err) {
      // console.log(err);
    }
  };
}