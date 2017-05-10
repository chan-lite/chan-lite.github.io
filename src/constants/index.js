// @flow

const BASE = "http://evanjones.xyz/proxy-chan/";

export const BOARDS = `${BASE}landing.php`;

export function GET_THREADS(board) {
  return `${BASE}board.php?board=${board}`;
}

export function GET_POSTS(board, thread) {
  return `${BASE}thread.php?board=${board}&thread=${thread}`;
}
