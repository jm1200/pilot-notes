import React from "react";
//import data from "../data/alts.json";
import MainNav from "../components/MainNav/MainNav";
import SecondaryNav from "../components/SecondaryNav/SecondaryNav";
import Editor from "../components/Editor/Editor";
import Options from "../components/MainNav/Options/Options";

const App: React.FC = () => {
  const dark = false;
  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <MainNav />
      <SecondaryNav />
      <Editor />
    </div>
  );
};

export default App;
