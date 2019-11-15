import React from "react";
import { useSelector } from "react-redux";
//import data from "../data/alts.json";
import MainNav from "../components/MainNav/MainNav";
import SecondaryNav from "../components/SecondaryNav/SecondaryNav";
import Editor from "../components/Editor/Editor";
import { RootState } from "types";

const App: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.appState.darkTheme);

  console.log(darkTheme);
  return (
    <div className={`app ${darkTheme ? "dark" : ""}`}>
      <MainNav />
      <SecondaryNav />
      <Editor />
    </div>
  );
};

export default App;
