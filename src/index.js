// @flow

import React, { createElement } from "react";
import { render } from "react-snapshot";
import { HashRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { Route, Switch } from "react-router";
import createHistory from "history/createHashHistory";
import LandingScene from "./scenes/landing/";
import BoardScene from "./scenes/board/";
import ThreadScene from "./scenes/thread/";
import SavedLandingScene from "./scenes/landing/saved";
import SavedBoardScene from "./scenes/board/saved";
import SavedThreadScene from "./scenes/thread/saved";
import Reducers from "./reducers/";
import "./styles/";

const preloaded = {};
const history = createHistory();
const routerMiddlewareCreated = routerMiddleware(history);
const reducers = combineReducers({ ...Reducers, route: routerReducer });
const appliedMiddlewards = applyMiddleware(routerMiddlewareCreated, Thunk);
const composedMiddlewards = compose(appliedMiddlewards, offline(offlineConfig));
const storeParams = [reducers, preloaded, composedMiddlewards];
const store = createStore(...storeParams);

render(
  createElement(function() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route
              path="/saved/:board/:thread/:post"
              component={SavedThreadScene}
            />
            <Route path="/saved/:board/:thread" component={SavedThreadScene} />
            <Route path="/saved/:board" component={SavedBoardScene} />
            <Route path="/saved" component={SavedLandingScene} />

            <Route path="/:board/:thread/:post" component={ThreadScene} />
            <Route path="/:board/:thread" component={ThreadScene} />
            <Route path="/:board" component={BoardScene} />
            <Route path="/" component={LandingScene} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }),
  document.getElementById("root")
);
