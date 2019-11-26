import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import Editor from "./Editor";
import AlternatesTool from "./AlternatesTool";
import { RootState, NoteItem, CategoryItem } from "types";
import { _loadSettings } from "slices/settingsStateSlice";
import { loadNotes } from "slices/noteStateSlice";
import { loadCategories } from "slices/categoryStateSlice";
import { syncState } from "slices/appStateSlice";
import { useInterval } from "helpers/hooks";

const App: React.FC = () => {
  const {
    darkTheme,
    codeMirrorOptions,
    loading,
    previewMarkdown
  } = useSelector((state: RootState) => state.settingsState);
  const { notes, activeNoteId, activeCategoryId, activeFolder } = useSelector(
    (state: RootState) => state.noteState
  );
  const { categories } = useSelector((state: RootState) => state.categoryState);
  const { navOpen, lastSynced, noteOpen } = useSelector(
    (state: RootState) => state.appState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_loadSettings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }));

  useInterval(() => {
    _syncState(notes, categories);
  }, 20000);

  const mainNavProps = {
    notes,
    categories,
    darkTheme,
    activeNoteId,
    activeCategoryId,
    activeFolder,
    navOpen,
    lastSynced
  };
  const secondaryNavProps = {
    notes,
    categories,
    noteOpen,
    activeNoteId,
    activeCategoryId,
    activeFolder
  };
  const editorProps = {
    notes,
    codeMirrorOptions,
    previewMarkdown,
    activeNoteId,
    loading,
    noteOpen
  };

  return (
    <div className={`app ${darkTheme ? "dark" : ""}`}>
      <MainNav {...mainNavProps} />
      <SecondaryNav {...secondaryNavProps} />
      <Editor {...editorProps} />
      <AlternatesTool />
    </div>
  );
};

export default App;
