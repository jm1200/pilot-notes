import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useDispatch } from "react-redux";
import { NoteItem, CodeMirrorOptions } from "types";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { ArrowLeft } from "react-feather";
import { toggleNoteOpen } from "slices/appStateSlice";
import { updateNote } from "slices/noteStateSlice";
import { togglePreviewMarkdown } from "slices/settingsStateSlice";
import { EditorContainer, Previewer } from "./Editor.styles";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/selection/active-line";

interface IEditorProps {
  notes: NoteItem[];
  activeNoteId: string;
  codeMirrorOptions: CodeMirrorOptions;
  previewMarkdown: boolean;
  loading: boolean;
  noteOpen: boolean;
}

const Editor: React.FC<IEditorProps> = ({
  notes,
  activeNoteId,
  codeMirrorOptions,
  previewMarkdown,
  loading,
  noteOpen
}) => {
  const activeNote = notes.find(note => note.id === activeNoteId);

  const dispatch = useDispatch();

  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown());

  const _toggleNoteOpen = () => dispatch(toggleNoteOpen());

  const _updateNote = (note: NoteItem) => dispatch(updateNote(note));

  const handleEditorChange = (value: string) => {
    if (activeNote) {
      const note: NoteItem = {
        ...activeNote,
        text: value,
        lastUpdated: moment().format()
      };
      _updateNote(note);
    }
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
            {/* <p>
              <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
            </p> */}
          </div>
        </div>
      );
    } else if (previewMarkdown) {
      return (
        <Previewer>
          <ReactMarkdown className="previewer" source={activeNote.text} />
          <button className="preview-button" onClick={_togglePreviewMarkdown}>
            Edit
          </button>
        </Previewer>
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
              handleEditorChange(value);
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
    <EditorContainer className={`note-editor ${noteOpen ? "note-open" : ""}`}>
      {renderEditor()}
      {noteOpen && (
        <footer>
          <button className="back-button" onClick={_toggleNoteOpen}>
            <ArrowLeft />
          </button>
        </footer>
      )}
    </EditorContainer>
  );
};

export default Editor;
