import React from "react";
import { useSelector } from "react-redux";
//import data from "../data/alts.json";
import MainNav from "./MainNav";
import SecondaryNav from "./SecondaryNav";
import Editor from "./Editor";
import AlternatesTool from "./AlternatesTool";
import { RootState } from "types";

const App: React.FC = () => {
  const { darkTheme, alternatesTool } = useSelector(
    (state: RootState) => state.appState
  );

  console.log(darkTheme);
  return (
    <div className={`app ${darkTheme ? "dark" : ""}`}>
      <MainNav />
      <SecondaryNav />
      <Editor />
      <AlternatesTool />
      {/* {alternatesTool ? <AlternatesTool /> : null} */}
    </div>
  );
};

export default App;
