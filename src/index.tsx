import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import {
  configureStore,
  getDefaultMiddleware,
  Middleware
} from "@reduxjs/toolkit";

import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import rootSaga from "sagas";
import rootReducer from "slices";
import { saveSettings } from "api";
import {
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateCodeMirrorOptions
} from "slices/settingsStateSlice";

import "./styles/index.scss";
const sagaMiddleware = createSagaMiddleware();

// const customMiddleware: Middleware = store => next => action => {
//   console.log("middleware: ", action);
//   const state = store.getState();
//   if (
//     action.type === togglePreviewMarkdown.type ||
//     action.type === toggleDarkTheme.type ||
//     action.type === updateCodeMirrorOptions.type
//   ) {
//     saveSettings(state.settingsState);
//     console.log("settings saved, ", state.settingsState);
//   }
//   next(action);
// };

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [...getDefaultMiddleware(), customMiddleware]
// });

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })]
});

sagaMiddleware.run(rootSaga);

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
