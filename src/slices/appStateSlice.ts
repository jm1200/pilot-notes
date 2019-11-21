import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, Folder, CategoryItem, NoteItem } from "types";
import { initialAppState } from "constants/initialStates";
import { sortByFavorites, sortByLastUpdated } from "helpers";

const getNewActiveNoteId = (
  notes: NoteItem[],
  oldNoteId: string,
  activeCategoryId: string
): string => {
  const notesNotTrash = notes.filter(note =>
    activeCategoryId
      ? !note.trash && note.category === activeCategoryId
      : !note.trash
  );
  const trashedNoteIndex = notesNotTrash.findIndex(
    note => note.id === oldNoteId
  );

  if (trashedNoteIndex === 0 && notesNotTrash[1]) return notesNotTrash[1].id;
  if (notesNotTrash[trashedNoteIndex - 1])
    return notesNotTrash[trashedNoteIndex - 1].id;
  return "";
};

export const getFirstNoteId = (
  folder: Folder,
  notes: NoteItem[],
  categoryId?: string
): string => {
  const notesNotTrash = notes
    .filter(note => !note.trash)
    .sort(sortByLastUpdated)
    .sort(sortByFavorites);
  const firstNote = {
    all: () => notesNotTrash[0],
    category: () => notesNotTrash.find(note => note.category === categoryId),
    favorites: () => notesNotTrash.find(note => note.favorite),
    trash: () => notes.find(note => note.trash)
  }[folder]();
  return firstNote ? firstNote.id : "";
};

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
    toggleTrashedNote(state: AppState, action: PayloadAction<string>) {
      console.log("move note to trash");
      const noteId = action.payload;
      state.notes = state.notes.map(note =>
        note.id === noteId ? { ...note, trash: !note.trash } : note
      );
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        noteId,
        state.activeCategoryId
      );
    },
    toggleFavoriteNote(state: AppState, action: PayloadAction<string>) {
      console.log("favorite");
      const noteId = action.payload;
      state.notes = state.notes.map(note =>
        note.id === noteId ? { ...note, favorite: !note.favorite } : note
      );
    },
    deleteNote(state: AppState, action: PayloadAction<string>) {
      const noteId = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        noteId,
        state.activeCategoryId
      );
    },
    updateCodeMirrorOptions(state: AppState, action: PayloadAction) {
      const theme = state.darkTheme ? "new-moon" : "base16-light";
      state.codeMirrorOptions.theme = theme;
    },
    swapCategory(state, action: PayloadAction<string>) {
      const categoryId = action.payload;
      state.activeCategoryId = categoryId;
      state.activeFolder = "category";
      state.activeNoteId = getFirstNoteId("category", state.notes, categoryId);
    },
    updateCategory(
      state: AppState,
      action: PayloadAction<{ oldId: string; newId: string }>
    ) {
      const { oldId, newId } = action.payload;
      state.categories = state.categories.map(category =>
        category.id === oldId ? { name: newId, id: newId } : category
      );
    },
    deleteCategory(state: AppState, action: PayloadAction<string>) {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        category => category.id !== categoryId
      );
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
  updateNote,
  toggleTrashedNote,
  deleteNote,
  toggleFavoriteNote,
  deleteCategory,
  updateCategory
} = appStateSlice.actions;

export default appStateSlice.reducer;
