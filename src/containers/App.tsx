import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import Editor from "./Editor";
import AlternatesTool from "./AlternatesTool";
import { RootState } from "types";
import { _loadSettings, fetchSettings } from "slices/settingsStateSlice";

const App: React.FC = () => {
  const { darkTheme } = useSelector((state: RootState) => state.settingsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(_loadSettings());
  }, []);

  // useEffect(() => {
  //   dispatch(fetchSettings());
  // }, []);

  return (
    <div className={`app ${darkTheme ? "dark" : ""}`}>
      <MainNav />
      <SecondaryNav />
      <Editor />
      <AlternatesTool />
    </div>
  );
};

export default App;
