import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, Folder, CategoryItem, NoteItem } from "types";
import { initialAppState } from "constants/initialStates";

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    addCategory(state: AppState, action: PayloadAction<CategoryItem>) {
      const newCategory = action.payload;
      state.categories.push(newCategory);
    },
    addCategoryToNote(
      state: AppState,
      action: PayloadAction<{ noteId: string; categoryId: string }>
    ) {
      const { noteId, categoryId } = action.payload;
      state.notes = state.notes.map(note =>
        note.id === noteId ? { ...note, category: categoryId } : note
      );
    },
    addNote(state: AppState, action: PayloadAction<NoteItem>) {
      const newNote = action.payload;
      state.notes.push(newNote);
    },
    updateNote(state: AppState, action: PayloadAction<NoteItem>) {
      const updatedNote = action.payload;
      state.notes = state.notes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
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
      state.activeFolder = "category";
    },
    swapFolder(state: AppState, action: PayloadAction<Folder>) {
      const folder = action.payload;
      state.activeFolder = folder;
      state.activeCategoryId = "";
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
  addCategoryToNote,
  addNote,
  addCategory,
  pruneNotes,
  swapNote,
  swapCategory,
  swapFolder,
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool,
  toggleMainNav,
  toggleNoteOpen,
  togglePreviewMarkdown,
  updateNote
} = appStateSlice.actions;

export default appStateSlice.reducer;
