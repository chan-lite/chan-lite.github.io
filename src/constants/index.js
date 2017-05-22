// @flow

export const BASE = "https://proxy-chan-go.herokuapp.com/chan/";
// export const BASE = "http://localhost:5000/chan/";

export const CHAN_BASE = "https://i.4cdn.org/";

export const BOARDS = `${BASE}landing`;

export const IMAGE_BASE = `${BASE}image?image=${CHAN_BASE}`;

export function GET_THREADS(board: string, page: number) {
  return `${BASE}board/${board}/${page}`;
}

export function GET_POSTS(board: string, thread: string) {
  return `${BASE}thread/${board}/${thread}`;
}

export const POST_SIGNUP = `${BASE}user/create`;
