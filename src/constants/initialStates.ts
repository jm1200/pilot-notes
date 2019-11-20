import { AppState } from "../types";
import seedData from "../data/seed";

export const initialAppState: AppState = {
  darkTheme: false,
  alternatesTool: false,
  notes: seedData.notes,
  navOpen: false,
  noteOpen: true,
  categories: seedData.categories,
  activeNoteId: "e0196fd9-d644-4ca8-aa58-467b8082993e",
  activeFolder: "all",
  activeCategoryId: "",
  loading: false,
  previewMarkdown: false,
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
