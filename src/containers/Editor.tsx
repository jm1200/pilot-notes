import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/selection/active-line";
import { useSelector } from "react-redux";
import { RootState } from "types";

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = props => {
  const { activeNoteId, notes, codeMirrorOptions } = useSelector(
    (state: RootState) => state.appState
  );
  const activeNote = notes.find(note => note.id === activeNoteId);

  const handleEditorChange = (value: string) => {
    //todo update note action
    //setActiveNote({ ...activeNote, text: value });
  };
  if (!activeNote) {
    return (
      <div className="empty-editor v-center">
        <div className="text-center">
          <p>
            <strong>Create a note</strong>
          </p>
          <p>
            <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <CodeMirror
        className="editor"
        value={activeNote.text}
        options={codeMirrorOptions}
        editorDidMount={editor => {
          editor.focus();
          editor.setCursor(0);
        }}
        onBeforeChange={(editor, data, value) => {
          handleEditorChange(value);
        }}
        onChange={(editor, data, value) => {
          if (!value) {
            editor.focus();
          }
        }}
      />
      {/* <button className="preview-button" onClick={_togglePreviewMarkdown}>
            Preview
          </button> */}
    </>
  );
};

export default Editor;
