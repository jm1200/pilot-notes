import { combineReducers, Reducer } from "redux";

import appStateReducer from "slices/appStateSlice";
import settingsStateReducer from "slices/settingsStateSlice";
import noteStateReducer from "slices/noteStateSlice";
import categoryStateReducer from "slices/categoryStateSlice";
import authStateSliceReducer from "slices/authStateSlice";
import { RootState } from "types";

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  appState: appStateReducer,
  settingsState: settingsStateReducer,
  noteState: noteStateReducer,
  categoryState: categoryStateReducer,
  authState: authStateSliceReducer
});

export default rootReducer;
