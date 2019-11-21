import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "types";
import { Menu, Star, MoreHorizontal } from "react-feather";
import { NoteItem } from "types";
import { sortByFavourites, sortByLastUpdated, getNoteTitle } from "helpers";
import {
  toggleMainNav,
  toggleNoteOpen,
  swapNote,
  pruneNotes
} from "slices/appStateSlice";
import _ from "lodash";

interface ISecondaryNavProps {}

const SecondaryNav: React.FC<ISecondaryNavProps> = props => {
  const {
    activeCategoryId,
    activeNoteId,
    activeFolder,
    notes,
    noteOpen,
    categories
  } = useSelector((state: RootState) => state.appState);

  const [searchValue, setSearchValue] = useState("");

  const showEmptyTrash = activeFolder === "trash";

  const re = new RegExp(_.escapeRegExp(searchValue), "i");
  const isMatch = (result: NoteItem) => re.test(result.text);

  const filter: Record<string, (note: NoteItem) => boolean> = {
    category: note => !note.trash && note.category === activeCategoryId,
    routes: note => !note.trash && note.category === "routes",
    favourites: note => !note.trash && !!note.favorite,
    trash: note => !!note.trash,
    all: note => !note.trash
  };
  const filteredNotes: NoteItem[] = notes
    .filter(filter[activeFolder])
    .filter(isMatch)
    .sort(sortByLastUpdated)
    .sort(sortByFavourites);

  const filteredCategories = categories.filter(
    ({ id }) => id !== activeCategoryId
  );

  const dispatch = useDispatch();

  const _setNavOpen = () => dispatch(toggleMainNav());
  const _setNoteOpen = () => dispatch(toggleNoteOpen());
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId));
  const _pruneNotes = () => dispatch(pruneNotes());

  const handleSearchNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const toggleNavOpen = () => {
    _setNavOpen();
  };

  const handleSwapNote = (noteId: string) => {
    _swapNote(noteId);
    _setNoteOpen();
    _pruneNotes();
  };

  const handleNoteOptionsClick = (event: React.MouseEvent, noteId: string) => {
    console.log("todo: handle note options click", noteId);
  };

  return (
    <div className={`note-sidebar ${noteOpen ? "note-open" : ""}`}>
      <div className="note-sidebar-header">
        <div className="mobile-sidebar-options">
          <button className="toggle-mobile-nav" onClick={toggleNavOpen}>
            <Menu />
          </button>
          <input
            type="search"
            onChange={event => handleSearchNotes(event)}
            placeholder="Search for notes"
          />
        </div>
        {showEmptyTrash && <button>EmptyTrash</button>}
      </div>
      <div className="note-list">
        {filteredNotes.map(note => {
          let noteTitle: string | React.ReactElement = getNoteTitle(note.text);
          if (searchValue) {
            //todo: highlight note titles
          }
          return (
            <div
              className={
                note.id === activeNoteId
                  ? "note-list-each active"
                  : "note-list-each"
              }
              key={note.id}
              onClick={() => handleSwapNote(note.id)}
            >
              <div className="note-title">
                {note.favorite ? (
                  <>
                    <div className="icon">
                      <Star className="note-favorite" size={12} />
                    </div>
                    <div> {noteTitle}</div>
                  </>
                ) : (
                  <>
                    <div className="icon"></div>
                    <div> {noteTitle}</div>
                  </>
                )}
              </div>
              <div
                className="note-options"
                onClick={event => handleNoteOptionsClick(event, note.id)}
              >
                <MoreHorizontal size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecondaryNav;
