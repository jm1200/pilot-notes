import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/selection/active-line";
import { useSelector, useDispatch } from "react-redux";
import { RootState, NoteItem } from "types";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { ArrowLeft } from "react-feather";
import {
  togglePreviewMarkdown,
  toggleNoteOpen,
  updateNote
} from "slices/appStateSlice";

interface IEditorProps {}

const Editor: React.FC<IEditorProps> = props => {
  const {
    activeNoteId,
    notes,
    codeMirrorOptions,
    loading,
    previewMarkdown,
    noteOpen
  } = useSelector((state: RootState) => state.appState);
  const activeNote = notes.find(note => note.id === activeNoteId);

  const dispatch = useDispatch();

  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown());

  const _toggleNoteOpen = () => dispatch(toggleNoteOpen());

  const _updateNote = (note: NoteItem) => dispatch(updateNote(note));

  const handleEditorChange = (note: NoteItem) => {
    console.log("editor, ", note);
    _updateNote(note);
  };

  const renderEditor = () => {
    if (loading) {
      return <div className="empty-editor v-center">Loading...</div>;
    } else if (!activeNote) {
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
    } else if (previewMarkdown) {
      return (
        <>
          <ReactMarkdown className="previewer" source={activeNote.text} />
          <button className="preview-button" onClick={_togglePreviewMarkdown}>
            Edit
          </button>
        </>
      );
    } else {
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
              handleEditorChange({
                id: activeNote.id,
                text: value,
                created: activeNote.created,
                lastUpdated: moment().format()
              });
            }}
            onChange={(editor, data, value) => {
              if (!value) {
                editor.focus();
              }
            }}
          />
          <button className="preview-button" onClick={_togglePreviewMarkdown}>
            Preview
          </button>
        </>
      );
    }
  };

  return (
    <main className={`note-editor ${noteOpen ? "note-open" : ""}`}>
      {renderEditor()}
      {noteOpen && (
        <footer>
          <button className="back-button" onClick={_toggleNoteOpen}>
            <ArrowLeft />
          </button>
        </footer>
      )}
    </main>
  );
};

export default Editor;
