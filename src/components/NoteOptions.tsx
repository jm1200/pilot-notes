import React from "react";

interface StyleProp {
  position: "absolute";
  top: string;
  left: string;
}

interface INoteOptionsProps {
  style: StyleProp;
}

const NoteOptions: React.FC<INoteOptionsProps> = ({ style }) => {
  return (
    <div
      className="note-options-context-menu"
      style={style}
      onClick={e => e.stopPropagation()}
    >
      <h1>NoteOptions Component</h1>
    </div>
  );
};

export default NoteOptions;
