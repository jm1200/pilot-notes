import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState } from "types";
import { initialAppState } from "constants/initialStates";

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
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
    },
    toggleMainNav(state: AppState) {
      state.navOpen = !state.navOpen;
    },
    toggleNoteOpen(state: AppState) {
      state.noteOpen = !state.noteOpen;
    },
    togglePreviewMarkdown(state: AppState) {
      state.previewMarkdown = !state.previewMarkdown;
    }
  }
});

export const {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool,
  toggleMainNav,
  toggleNoteOpen,
  togglePreviewMarkdown
} = appStateSlice.actions;
console.log(toggleDarkTheme());

export default appStateSlice.reducer;
