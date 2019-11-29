import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, SyncStatePayload } from "types";
import seedData from "data/seed";

export const initialAppState: AppState = {
  alternatesTool: false,
  navOpen: false,
  noteOpen: false,
  categories: seedData.categories,
  loading: false,
  syncing: false,
  lastSynced: "",
  syncError: ""
};

const appStateSlice = createSlice({
  name: "appState",
  initialState: initialAppState,
  reducers: {
    toggleAlternatesTool(state: AppState) {
      state.alternatesTool = !state.alternatesTool;
    },
    toggleMainNav(state: AppState) {
      state.navOpen = !state.navOpen;
    },
    setMainNav(state: AppState, action: PayloadAction<boolean>) {
      state.navOpen = action.payload;
    },
    toggleNoteOpen(state: AppState) {
      state.noteOpen = !state.noteOpen;
    },
    syncState: (state: AppState, action: PayloadAction<SyncStatePayload>) => {
      state.syncing = true;
    },
    syncStateSuccess(state: AppState, action: PayloadAction<string>) {
      state.syncing = false;
      state.lastSynced = action.payload;
    },
    syncStateError(state: AppState, action: PayloadAction<string>) {
      state.syncing = false;
      state.syncError = action.payload;
    }
  }
});

export const {
  toggleAlternatesTool,
  toggleMainNav,
  setMainNav,
  toggleNoteOpen,
  syncState,
  syncStateError,
  syncStateSuccess
} = appStateSlice.actions;

export default appStateSlice.reducer;
