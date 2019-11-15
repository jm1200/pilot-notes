import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "./styles/index.scss";
import * as serviceWorker from "./serviceWorker";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "slices";

const store = configureStore({
  reducer: rootReducer
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
