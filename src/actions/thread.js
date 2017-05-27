// @flow

import { setAccountModal } from "./account";
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
    const { token } = getState().Account;
    const data = new FormData();
    data.append("token", token);
    const options = { method: "POST", body: data };
    try {
      const request = await fetch(loc, options);
      const { success, message } = await request.json();
      if (!success) {
        alert(message);
      }
    } catch (err) {
      alert("An unexpected error has occurred");
    } finally {
      // trigger updates in components
      dispatch(setAccountModal(true));
      dispatch(setAccountModal(false));
    }
  };
}
