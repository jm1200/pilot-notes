import { syncState } from "slices/appStateSlice";

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
  alternatesTool: boolean;
  categories: CategoryItem[];
  navOpen: boolean;
  noteOpen: boolean;
  loading: boolean;
  syncing: boolean;
  lastSynced: string;
  syncError: string;
}

export interface SettingsState {
  previewMarkdown: boolean;
  loading: boolean;
  darkTheme: boolean;
  codeMirrorOptions: { [key: string]: any };
  error?: string;
}

export interface SyncState {
  syncing: boolean;
  lastSynced: string;
  error: string;
}

//==============================================================================
// Api
//==============================================================================

export interface SyncStatePayload {
  categories: CategoryItem[];
  notes: NoteItem[];
}

export interface SyncStateAction {
  type: typeof syncState.type;
  payload: SyncStatePayload;
}

//==============================================================================
// State
//==============================================================================

export interface CategoryState {
  categories: CategoryItem[];
  error: string;
  loading: boolean;
}

export interface NoteState {
  notes: NoteItem[];
  activeFolder: Folder;
  activeNoteId: string;
  activeCategoryId: string;
  error: string;
  loading: boolean;
  searchValue: string;
}

export interface RootState {
  appState: AppState;
  settingsState: SettingsState;
  noteState: NoteState;
  categoryState: CategoryState;
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
