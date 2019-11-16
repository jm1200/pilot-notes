import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "types";

interface IAlternatesToolProps {}

const AlternatesTool: React.FC<IAlternatesToolProps> = props => {
  const { alternatesTool } = useSelector((state: RootState) => state.appState);
  return (
    <aside
      className={`alternates-tool-container ${alternatesTool ? "open" : ""}`}
    >
      <h1>AlternatesTool Component</h1>
    </aside>
  );
};

export default AlternatesTool;
