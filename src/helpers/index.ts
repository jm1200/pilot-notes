import { NoteItem } from "types";
import { uuid } from "uuidv4";
import { Folder } from "types";
import moment from "moment";

export const sortByFavourites = (a: NoteItem, b: NoteItem) => {
  if (a.favorite && !b.favorite) return -1;
  if (!a.favorite && b.favorite) return 1;
  return 0;
};

export const sortByLastUpdated = (a: NoteItem, b: NoteItem) => {
  let dateA = new Date(a.lastUpdated);
  let dateB = new Date(b.lastUpdated);

  return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
};

export const getNoteTitle = (text: string): string => {
  const noteText = text.trim().match(/[^#]{1,50}/);
  const noteTextFirstLine = noteText
    ? noteText[0].split(/\r?\n/)[0]
    : "New Note";

  return noteTextFirstLine;
};

export const newNote = (categoryId?: string, folder?: Folder): NoteItem => ({
  id: uuid(),
  text: "",
  created: moment().format(),
  lastUpdated: moment().format(),
  category: categoryId,
  favorite: folder === "favourites"
});
