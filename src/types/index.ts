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
  name: string;
}

export interface AppState {
  darkTheme: boolean;
  codeMirrorOptions: { [key: string]: any };
  alternatesTool: boolean;
  notes: NoteItem[];
  categories: CategoryItem[];
  activeNoteId: string;
  activeFolder: string;
  activeCategoryId: string;
  navOpen: boolean;
  noteOpen: boolean;
}

export interface RootState {
  appState: AppState;
}
