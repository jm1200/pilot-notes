import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "types";

import seedNotes from "data/seed.json";

const initialState: AppState = {
  darkTheme: false,
  alternatesTool: false,
  notes: seedNotes,
  activeNoteId: "1",
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
    },
    toggleAlternatesTool(state: AppState) {
      state.alternatesTool = !state.alternatesTool;
    }
  }
});

export const {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool
} = appStateSlice.actions;
console.log(toggleDarkTheme());

export default appStateSlice.reducer;
