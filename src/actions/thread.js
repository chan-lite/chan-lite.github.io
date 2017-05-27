// @flow

import { GET_POSTS, GET_SAVE_THREAD } from "../constants/";
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

export function saveThread(board, thread) {
  const loc = GET_SAVE_THREAD(board, thread);
  return async function(dispatch, getState) {
    console.log(getState());
    const data = new FormData();
    // data.append("name", "Nothing to see here");
    // data.append("email", email);
    // data.append("device", "Nothing to see here");
    // data.append("password", password);
    const options = { method: "POST", body: data };
    try {
      const request = await fetch(loc, options);
      const response = await request.json();
      console.log("complete", response);
    } catch (err) {
      console.log("error", err);
    }
  };
}
