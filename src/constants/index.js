// @flow

export const BASE = "http://evanjones.xyz/proxy-chan/";

export const CHAN_BASE = "http://i.4cdn.org/";

export const BOARDS = `${BASE}landing.php`;

export function GET_THREADS(board: string, page: number) {
  return `${BASE}board.php?board=${board}&page=${page}`;
}

export function GET_POSTS(board: string, thread: string) {
  return `${BASE}thread.php?board=${board}&thread=${thread}`;
}
