import React from "react";
import { useSelector } from "react-redux";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import Editor from "./Editor";
import AlternatesTool from "./AlternatesTool";
import { RootState } from "types";

const App: React.FC = () => {
  const { darkTheme } = useSelector((state: RootState) => state.appState);

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
