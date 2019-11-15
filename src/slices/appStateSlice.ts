import { createSlice, Slice } from "@reduxjs/toolkit";

import { AppState } from "types";

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
console.log(toggleDarkTheme());

export default appStateSlice.reducer;
