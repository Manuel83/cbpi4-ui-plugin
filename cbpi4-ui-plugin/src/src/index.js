import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import app from "./reducers"
import logger from "redux-logger";
import Sample from './sample'
import {Provider} from "react-redux";
import wsMiddleware from "./middleware/ws_middleware"
import thunk from "redux-thunk";

const store = createStore(
    app,
    applyMiddleware(thunk, logger, wsMiddleware)
)

store.dispatch({ type: "WS_CONNECT", data: {} })


ReactDOM.render(
    <Provider store={store}>
    <Sample/>
    </Provider>,
  document.getElementById('root')
);