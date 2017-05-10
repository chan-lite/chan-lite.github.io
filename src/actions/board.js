// @flow

import { GET_THREADS } from "../constants/";
import type { DispatchType } from "./types";

function setBoards(data) {
  return {
    type: "SET_THREADS",
    payload: data
  };
}

export function requestBoard(board) {
  return async function(dispatch: DispatchType) {
    try {
      const response = await fetch(GET_THREADS(board));
      const threads = await response.json();
      const data = {
        name: `/${board}`,
        threads: threads
      };
      dispatch(setBoards(data));
    } catch (err) {
      // console.log(err);
    }
  };
}
