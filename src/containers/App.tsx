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
  const { darkTheme } = useSelector((state: RootState) => state.settingsState);
  const { notes } = useSelector((state: RootState) => state.noteState);
  const { categories } = useSelector((state: RootState) => state.categoryState);
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

  return (
    <div className={`app ${darkTheme ? "dark" : ""}`}>
      {/* <button onClick={(notes, categories)=>syncState({notes, categories})} >sync</button> */}
      <MainNav />
      <SecondaryNav />
      <Editor />
      <AlternatesTool />
    </div>
  );
};

export default App;
