import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

import { AppState } from "../types";

const initialState: AppState = {
  darkTheme: false
};

const appStateSlice: Slice<AppState> = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleDarkTheme: (state: AppState) => ({
      ...state,
      darkTheme: !state.darkTheme
    })
  }
});

export const { toggleDarkTheme } = appStateSlice.actions;

export default appStateSlice.reducer;
