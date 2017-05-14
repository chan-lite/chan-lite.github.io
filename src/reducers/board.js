// @flow

import type { ActionType } from "./types";

type StateType = Object;

const initial = {
  threads: {}
};

export default function(state: StateType = initial, action: ActionType) {
  switch (action.type) {
    case "SET_THREADS": {
      const aThreads = action.payload.threads
        .map(data => {
          return data.Posts[0];
        })
        .map(({ No, Now, Name, Com, Filename, Ext, Tn_w, Tn_h, Tim, Time }) => {
          return {
            no: No,
            now: Now,
            name: Name,
            com: Com,
            filename: Filename,
            ext: Ext,
            tn_w: Tn_w,
            tn_h: Tn_h,
            tim: Tim,
            time: Time
          };
        });

      const data = {};
      data[action.payload.name] = aThreads;

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: threads });
    }

    case "ADD_THREADS": {
      const aThreads = action.payload.threads
        .map(data => {
          return data.Posts[0];
        })
        .map(({ No, Now, Name, Com, Filename, Ext, Tn_w, Tn_h, Tim, Time }) => {
          return {
            no: No,
            now: Now,
            name: Name,
            com: Com,
            filename: Filename,
            ext: Ext,
            tn_w: Tn_w,
            tn_h: Tn_h,
            tim: Tim,
            time: Time
          };
        });

      const data = {};
      const board = action.payload.name;
      data[board] = state.threads[board].concat(aThreads);

      const threads = Object.assign({}, state.threads, data);
      return Object.assign({}, state, { threads: threads });
    }

    default: {
      return state;
    }
  }
}
