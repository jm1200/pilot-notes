import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "./MainNav/MainNav";
import NoteList from "./NoteList/NoteList";
import Editor from "./Editor/Editor";
import AlternatesTool from "./AlternatesTool/AlternatesTool";
import { RootState, NoteItem, CategoryItem } from "types";
import { _loadSettings } from "slices/settingsStateSlice";
import { loadNotes } from "slices/noteStateSlice";
import { loadCategories } from "slices/categoryStateSlice";
import { syncState } from "slices/appStateSlice";
import { useInterval } from "helpers/hooks";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import { AppContainer } from "./App.styles";
import { themes } from "styles/themes";
import Footer from "./Footer/Footer";

const App: React.FC = () => {
  const {
    darkThemeSetting,
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

  const mainNavProps = {
    notes,
    categories,
    darkThemeSetting,
    activeNoteId,
    activeCategoryId,
    activeFolder,
    navOpen,
    lastSynced
  };
  const noteListProps = {
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

  const lightTheme = () => ({
    ...themes["common"],
    ...themes["light"]
  });

  const darkTheme = () => ({
    ...themes["common"],
    ...themes["dark"]
  });

  const dispatch = useDispatch();

  // const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
  //   dispatch(syncState({ notes, categories }));

  // useInterval(() => {
  //   _syncState(notes, categories);
  // }, 20000);

  useEffect(() => {
    dispatch(_loadSettings());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkThemeSetting ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppContainer className={`app ${darkThemeSetting ? "dark" : ""}`}>
        <MainNav {...mainNavProps} />
        <NoteList {...noteListProps} />
        <Editor {...editorProps} />
        <AlternatesTool />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
