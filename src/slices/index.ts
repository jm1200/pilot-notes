import { combineReducers, Reducer } from "redux";

import appStateReducer from "slices/appStateSlice";
import { RootState } from "types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  appState: appStateReducer
});

export default rootReducer;
