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

export const POST_LOGIN = `${BASE}user/signin`;

// This is the URL we post to to initiall save
// a thread, not to query it.
export function GET_SAVE_THREAD(board, thread) {
  return `${BASE}user/save/thread/${board}/${thread}`;
}

export const SAVED_LANDING = `${BASE}user/save/get/landing`;
