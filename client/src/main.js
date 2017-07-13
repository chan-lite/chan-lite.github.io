import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { DrawerNavigator, StackNavigator } from "react-navigation";

/**
 * Reducers.
 */
import BoardList from "./reducers/boardList";
import ThreadList from "./reducers/threadList";
import PostList from "./reducers/postList";

/**
 * Scenes.
 */
import Home from "./scenes/home";
import Board from "./scenes/board";
import Thread from "./scenes/thread";

/**
 * Configs.
 */
const reducers = combineReducers({ BoardList, ThreadList, PostList });
const store = createStore(reducers, applyMiddleware(Thunk));
const Stacks = StackNavigator({ Home, Board, Thread });

/**
 * Application entry.
 */
export default function() {
  return (
    <Provider store={store}>
      <Stacks />
    </Provider>
  );
}
