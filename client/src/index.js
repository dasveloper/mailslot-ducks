
import * as serviceWorker from './serviceWorker';
import "./assets/App.scss"

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import WebFont from 'webfontloader';
import thunk from 'redux-thunk';

import {
  createStore,
  applyMiddleware
} from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

WebFont.load({
  google: {
    families: ['Roboto:300,400,500,700,900', 'sans-serif']
  }
});


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
