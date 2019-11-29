import React from "react";
import { FooterContainer } from "./Footer.styles";
import FooterActionButton from "components/FooterActionButton/FooterActionButton";
import { ArrowLeftCircle, Edit, FileText, Plus } from "react-feather";
import { useDispatch } from "react-redux";
import { toggleNoteOpen } from "slices/appStateSlice";
import { togglePreviewMarkdown } from "slices/settingsStateSlice";
import { addNote, swapFolder, swapNote } from "slices/noteStateSlice";
import { NoteItem, Folder } from "types";
import { newNote } from "helpers";

interface IFooterProps {
  previewMarkdown: boolean;
  noteOpen: boolean;
  activeFolder: Folder;
  activeNoteId: string;
  notes: NoteItem[];
  activeCategoryId: string;
}

const Footer: React.FC<IFooterProps> = ({
  previewMarkdown,
  noteOpen,
  activeFolder,
  activeNoteId,
  notes,
  activeCategoryId
}) => {
  const dispatch = useDispatch();
  const _toggleNoteOpen = () => dispatch(toggleNoteOpen());
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown());
  const _addNote = (note: NoteItem) => {
    dispatch(addNote(note));
  };
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder));
  const _swapNote = (noteId: string) => {
    dispatch(swapNote(noteId));
  };

  const activeNote = notes.find(note => note.id === activeNoteId);

  const handleNewNote = () => {
    if (activeFolder === "trash") {
      _swapFolder("all");
    }
    if ((activeNote && activeNote.text !== "") || !activeNote) {
      const note = newNote(
        activeCategoryId,
        activeFolder === "favorites" ? "favorites" : "all"
      );
      _addNote(note);
      _swapNote(note.id);
      _toggleNoteOpen();
    }
  };

  return (
    <FooterContainer>
      {!noteOpen ? (
        <FooterActionButton
          icon={Plus}
          label={"Add Note"}
          handler={handleNewNote}
        />
      ) : previewMarkdown ? (
        <>
          <FooterActionButton
            icon={ArrowLeftCircle}
            label={"Back"}
            handler={_toggleNoteOpen}
          />
          <FooterActionButton
            icon={Edit}
            label={"Edit"}
            handler={_togglePreviewMarkdown}
          />
        </>
      ) : (
        <>
          <FooterActionButton
            icon={ArrowLeftCircle}
            label={"Back"}
            handler={_toggleNoteOpen}
          />
          <FooterActionButton
            icon={FileText}
            label={"Preview"}
            handler={_togglePreviewMarkdown}
          />
        </>
      )}
    </FooterContainer>
  );
};

export default Footer;
