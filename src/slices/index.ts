import { combineReducers, Reducer } from "redux";

import appStateReducer from "slices/appStateSlice";
import settingsStateReducer from "slices/settingsStateSlice";
import { RootState } from "types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  appState: appStateReducer,
  settingsState: settingsStateReducer
});

export default rootReducer;
