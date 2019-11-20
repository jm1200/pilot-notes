import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, Folder } from "types";
import { initialAppState } from "constants/initialStates";

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    pruneNotes(state: AppState) {
      state.notes = state.notes.filter(
        note => note.text !== "" || note.id === state.activeNoteId
      );
    },
    swapNote(state: AppState, action: PayloadAction<string>) {
      const noteId = action.payload;
      state.activeNoteId = noteId;
    },
    swapCategory(state: AppState, action: PayloadAction<string>) {
      const categoryId = action.payload;
      state.activeCategoryId = categoryId;
    },
    swapFolder(state: AppState, action: PayloadAction<Folder>) {
      const folder = action.payload;
      state.activeFolder = folder;
    },
    toggleDarkTheme(state: AppState) {
      state.darkTheme = !state.darkTheme;
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
    },
    updateCodeMirrorOptions(state: AppState, action: PayloadAction) {
      const theme = state.darkTheme ? "new-moon" : "base16-light";
      state.codeMirrorOptions.theme = theme;
    }
  }
});

export const {
  pruneNotes,
  swapNote,
  swapCategory,
  swapFolder,
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool,
  toggleMainNav,
  toggleNoteOpen,
  togglePreviewMarkdown
} = appStateSlice.actions;
console.log(toggleDarkTheme());

export default appStateSlice.reducer;
