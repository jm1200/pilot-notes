import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "types";
import { Menu, Star, MoreHorizontal } from "react-feather";
import { NoteItem } from "types";
import { sortByFavourites, sortByLastUpdated, getNoteTitle } from "helpers";
import { toggleMainNav, toggleNoteOpen } from "slices/appStateSlice";
import _ from "lodash";

interface ISecondaryNavProps {}

const SecondaryNav: React.FC<ISecondaryNavProps> = props => {
  const {
    activeCategoryId,
    activeNoteId,
    activeFolder,
    notes,
    navOpen,
    noteOpen
  } = useSelector((state: RootState) => state.appState);

  console.log(activeNoteId);
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

  const dispatch = useDispatch();

  const _setNavOpen = () => dispatch(toggleMainNav());
  const _setNoteOpen = () => dispatch(toggleNoteOpen());

  const handleSearchNotes = (event: React.ChangeEvent<HTMLFormElement>) => {
    console.log("todo: handle search notes", event.target.value);
  };

  const toggleNavOpen = () => {
    console.log("test");
    _setNavOpen();
  };

  const toggleNoteOpen = () => {
    _setNoteOpen();
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
            onChange={event => handleSearchNotes}
            placeholder="Search for notes"
          />
        </div>
        {showEmptyTrash && <button>EmptyTrash</button>}
      </div>
      <div className="note-list">
        {filteredNotes.map(note => {
          console.log(note.id === activeNoteId);
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
              //onCLick todo: setOpenNote, swapnotes, pruneNotes
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
