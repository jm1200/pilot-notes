import { SettingsState, CategoryItem, NoteItem, SyncStatePayload } from "types";

export const saveSettings = (settings: SettingsState) => {
  return localStorage.setItem("settings", JSON.stringify(settings));
};

export const requestSettings = () => {
  return localStorage.getItem("settings");
};

export const requestNotes = () => {
  const notes = localStorage.getItem("notes");
  if (notes) {
    return JSON.parse(notes) as NoteItem[];
  }
};

export const requestCategories = () => {
  const categories = localStorage.getItem("categories");
  if (categories) {
    return JSON.parse(categories) as CategoryItem[];
  }
};

export const saveState = async ({ categories, notes }: SyncStatePayload) => {
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("notes", JSON.stringify(notes));
};
