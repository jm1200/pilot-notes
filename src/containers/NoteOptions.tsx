import React from "react";
import { NoteItem } from "types";
import NoteOptionsButton from "components/NoteOptionsButton";
import { X, ArrowUp, Star, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import {
  toggleTrashedNote,
  deleteNote,
  toggleFavoriteNote
} from "slices/noteStateSlice";

interface INoteOptionsProps {
  clickedNote: NoteItem;
}

const NoteOptions: React.FC<INoteOptionsProps> = ({ clickedNote }) => {
  const note = clickedNote;
  const dispatch = useDispatch();
  const _deleteNote = (noteId: string) => dispatch(deleteNote(noteId));
  const _toggleTrashedNote = (noteId: string) =>
    dispatch(toggleTrashedNote(noteId));
  const _toggleFavoriteNote = (noteId: string) =>
    dispatch(toggleFavoriteNote(noteId));

  const handleTrashNote = () => {
    _toggleTrashedNote(note.id);
  };

  const handleMakeFavorite = () => {
    _toggleFavoriteNote(note.id);
  };

  const handleDeleteNote = () => {
    _deleteNote(note.id);
  };
  return (
    <div className="note-options-nav">
      <nav className="note-options-nav" data-testid="note-options-nav">
        {clickedNote.trash ? (
          <>
            <NoteOptionsButton
              handler={handleDeleteNote}
              icon={X}
              text="Delete permanently"
            />
            <NoteOptionsButton
              handler={handleTrashNote}
              icon={ArrowUp}
              text="Restore from trash"
            />
          </>
        ) : (
          <>
            <NoteOptionsButton
              data-testid="note-option-favorite-button"
              handler={handleMakeFavorite}
              icon={Star}
              text={
                clickedNote.favorite ? "Remove favorite" : "Mark as favorite"
              }
            />
            <NoteOptionsButton
              data-testid="note-option-trash-button"
              handler={handleTrashNote}
              icon={Trash}
              text="Move to trash"
            />
          </>
        )}
        {/* <NoteOptionsButton handler={downloadNoteHandler} icon={Download} text="Download" /> */}
      </nav>
    </div>
  );
};

export default NoteOptions;
