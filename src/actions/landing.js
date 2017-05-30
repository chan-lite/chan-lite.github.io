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
      const { Boards, success } = await response.json();
      if (typeof success === "undefined") {
        dispatch(setBoards(Boards));
      }
    } catch (err) {
      // console.log(err);
    }
  };
}
