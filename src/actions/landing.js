// @flow

import { BOARDS } from "../constants/";
import type { DispatchType } from "./types";

function setBoards(boards) {
  return {
    type: "SET_BOARDS",
    payload: boards
  };
}

export function requestBoards() {
  return async function(dispatch: DispatchType) {
    try {
      const response = await fetch(BOARDS);
      const { boards } = await response.json();
      dispatch(setBoards(boards));
    } catch (err) {
      // console.log(err);
    }
  };
}
