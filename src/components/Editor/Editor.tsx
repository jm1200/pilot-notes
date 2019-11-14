import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/selection/active-line";

interface IEditorProps {}

const codeMirrorOptions = {
  mode: "gfm",
  theme: "base16-light",
  lineNumbers: false,
  lineWrapping: true,
  styleActiveLine: { nonEmpty: true },
  viewportMargin: Infinity,
  keyMap: "default",
  dragDrop: false
};

const Editor: React.FC<IEditorProps> = props => {
  return (
    <>
      <CodeMirror
        className={`editor`}
        value={""}
        options={codeMirrorOptions}
        editorDidMount={editor => {
          editor.focus();
          editor.setCursor(0);
        }}
        onKeyUp={editor => {
          // if (editor.state.vim) {
          //   _updateVimStateMode(
          //     editor.state.vim.insertMode ? VimModes.insert : VimModes.default
          //   )
          // }
        }}
        onBeforeChange={(editor, data, value) => {
          // _updateNote({
          //   id: activeNote.id,
          //   text: value,
          //   created: activeNote.created,
          //   lastUpdated: moment().format(),
          // })
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
