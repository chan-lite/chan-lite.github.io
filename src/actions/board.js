// @flow

import { GET_THREADS, GET_SAVED_BOARD } from "../constants/";
import type { DispatchType } from "./types";

function setBoards(data) {
  return {
    type: "SET_THREADS",
    payload: data
  };
}

function addBoard(data) {
  return {
    type: "ADD_THREADS",
    payload: data
  };
}

export function requestBoard(board: string, page: number) {
  return async function(dispatch: DispatchType) {
    try {
      const response = await fetch(GET_THREADS(board, page));
      const { Threads } = await response.json();
      const data = {
        name: `/${board}`,
        threads: Threads
      };
      if (page === 1) {
        dispatch(setBoards(data));
      } else {
        dispatch(addBoard(data));
      }
    } catch (err) {
      // console.log(err);
    }
  };
}

function setSavedBoards(data) {
  return {
    type: "SET_SAVED_THREADS",
    payload: data
  };
}

function addSavedBoard(data) {
  return {
    type: "ADD_SAVED_THREADS",
    payload: data
  };
}

export function requestSavedBoards(board, page, perPage) {
  const loc = GET_SAVED_BOARD(board, page, perPage);
  return async function(dispatch, getState) {
    // Get/check token.
    const { token } = getState().Account;
    if (!token) return;

    // Build data.
    const data = new FormData();
    data.append("token", token);
    const options = { method: "POST", body: data };

    try {
      const request = await fetch(loc, options);
      const { Threads, success } = await request.json();
      const data = {
        name: `/${board}`,
        threads: Threads
      };
      if (typeof success === "undefined") {
        if (page === 1) {
          dispatch(setSavedBoards(data));
        } else {
          dispatch(addSavedBoard(data));
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };
}
