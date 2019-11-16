import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "types";

const initialState: AppState = {
  darkTheme: false,
  codeMirrorOptions: {
    mode: "gfm",
    theme: "base16-light",
    lineNumbers: false,
    lineWrapping: true,
    styleActiveLine: { nonEmpty: true },
    viewportMargin: Infinity,
    keyMap: "default",
    dragDrop: false
  }
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleDarkTheme(state: AppState) {
      state.darkTheme = !state.darkTheme;
    },
    updateCodeMirrorOptions(state: AppState, action: PayloadAction) {
      const theme = state.darkTheme ? "new-moon" : "base16-light";
      state.codeMirrorOptions.theme = theme;
    }
  }
});

export const {
  toggleDarkTheme,
  updateCodeMirrorOptions
} = appStateSlice.actions;
console.log(toggleDarkTheme());

export default appStateSlice.reducer;
