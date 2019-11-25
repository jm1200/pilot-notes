import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteState, NoteItem, Folder } from "types";
import { sortByFavorites, sortByLastUpdated } from "helpers";

const initialState: NoteState = {
  notes: [],
  activeFolder: "all",
  activeNoteId: "",
  activeCategoryId: "",
  error: "",
  loading: false,
  searchValue: ""
};

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

const noteStateSlice = createSlice({
  name: "noteStateSlice",
  initialState,
  reducers: {
    loadNotes(state: NoteState) {
      state.loading = true;
    },
    loadNotesSuccess(state: NoteState, action: PayloadAction<NoteItem[]>) {
      const notes = action.payload;
      state.notes = notes;
      state.loading = false;
      state.activeNoteId = getFirstNoteId("all", notes);
    },
    loadNotesError(state: NoteState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addCategoryToNote(
      state: NoteState,
      action: PayloadAction<{ noteId: string; categoryId: string }>
    ) {
      const { noteId, categoryId } = action.payload;

      state.notes = state.notes.map(note =>
        note.id === noteId ? { ...note, category: categoryId } : note
      );
    },
    emptyTrash: state => ({
      ...state,
      notes: state.notes.filter(note => !note.trash)
    }),
    addNote(state: NoteState, action: PayloadAction<NoteItem>) {
      const newNote = action.payload;
      state.notes.push(newNote);
    },
    updateNote(state: NoteState, action: PayloadAction<NoteItem>) {
      const updatedNote = action.payload;
      state.notes = state.notes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
    pruneNotes(state: NoteState) {
      state.notes = state.notes.filter(
        note => note.text !== "" || note.id === state.activeNoteId
      );
    },
    toggleTrashedNote(state: NoteState, action: PayloadAction<string>) {
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
    toggleFavoriteNote(state: NoteState, action: PayloadAction<string>) {
      console.log("favorite");
      const noteId = action.payload;
      state.notes = state.notes.map(note =>
        note.id === noteId ? { ...note, favorite: !note.favorite } : note
      );
    },
    deleteNote(state: NoteState, action: PayloadAction<string>) {
      const noteId = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        noteId,
        state.activeCategoryId
      );
    },

    swapCategory(state, action: PayloadAction<string>) {
      const categoryId = action.payload;
      state.activeCategoryId = categoryId;
      state.activeFolder = "category";
      state.activeNoteId = getFirstNoteId("category", state.notes, categoryId);
    },
    swapNote(state: NoteState, action: PayloadAction<string>) {
      const noteId = action.payload;
      state.activeNoteId = noteId;
    },
    swapFolder(state: NoteState, action: PayloadAction<Folder>) {
      const folder = action.payload;
      state.activeFolder = folder;
      state.activeCategoryId = "";
    }
  }
});

export const {
  loadNotes,
  loadNotesError,
  loadNotesSuccess,
  swapCategory,
  deleteNote,
  toggleFavoriteNote,
  toggleTrashedNote,
  addCategoryToNote,
  addNote,
  updateNote,
  pruneNotes,
  swapFolder,
  swapNote,
  emptyTrash
} = noteStateSlice.actions;

export default noteStateSlice.reducer;
