// @flow

// export const BASE = "https://proxy-chan-go.herokuapp.com/chan/";
export const BASE = "http://localhost:5000/chan/";

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

// Save the current thread
export function GET_SAVE_THREAD(board, thread) {
  return `${BASE}user/save/thread/${board}/${thread}`;
}

// Get the current thread from saved
export function GET_SAVED_BOARD(board, page, perPage) {
  return `${BASE}user/save/get/board/${board}/${page}/${perPage}`;
}

export const SAVED_LANDING = `${BASE}user/save/get/landing`;
