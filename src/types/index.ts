import { ThunkAction } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

export interface AltObject {
  icao: string;
  iata: string;
  airport: string;
  e190: string;
  a3xx: string;
  b737: string;
  a330: string;
  b767: string;
  b787: string;
  b777: string;
  remarks: string;
}

export interface NoteItem {
  id: string;
  text: string;
  created: string;
  lastUpdated: string;
  category?: string;
  trash?: boolean;
  favorite?: boolean;
}

export interface CategoryItem {
  id: string;
}

export type Folder = "all" | "trash" | "favorites" | "category";

export interface AppState {
  // darkTheme: boolean;
  // codeMirrorOptions: { [key: string]: any };
  alternatesTool: boolean;
  notes: NoteItem[];
  categories: CategoryItem[];
  activeNoteId: string;
  activeFolder: string;
  activeCategoryId: string;
  navOpen: boolean;
  noteOpen: boolean;
  loading: boolean;
  // previewMarkdown: boolean;
}

export interface RootState {
  appState: AppState;
  settingsState: SettingsState;
}

export interface SettingsState {
  previewMarkdown: boolean;
  loading: boolean;
  darkTheme: boolean;
  codeMirrorOptions: { [key: string]: any };
  error?: string;
}
//==============================================================================
// Events
//==============================================================================

export type ReactDragEvent = React.DragEvent<HTMLDivElement>;

export type ReactMouseEvent =
  | MouseEvent
  | React.MouseEvent<HTMLDivElement>
  | React.ChangeEvent<HTMLSelectElement>;

export type ReactSubmitEvent =
  | React.FormEvent<HTMLFormElement>
  | React.FocusEvent<HTMLInputElement>;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
