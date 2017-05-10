// @flow

import { GET_THREADS } from "../constants/";
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
      const { threads } = await response.json();
      const data = {
        name: `/${board}`,
        threads: threads
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
