const initialState = {
  threads: []
};

const ThreadListReceived = "ThreadListReceived";

function receivedThreadList(threads, board) {
  return {
    type: ThreadListReceived,
    payload: { threads, board }
  };
}

export function requestThreadList(board, page) {
  return async function(dispatch) {
    try {
      const url = `https://a.4cdn.org/${board}/${page}.json`;
      const response = await fetch(url);
      const { threads } = await response.json();
      dispatch(receivedThreadList(threads, board));
    } catch (err) {
      console.log(err);
    }
  };
}

function getFirstPostWithBoard(board) {
  return item => {
    const firstPost = item.posts[0];
    firstPost.board = board;
    return firstPost;
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ThreadListReceived: {
      return {
        threads: action.payload.threads.map(
          getFirstPostWithBoard(action.payload.board)
        )
      };
    }

    default: {
      return state;
    }
  }
}
