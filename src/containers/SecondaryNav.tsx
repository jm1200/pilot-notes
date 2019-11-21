import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, CategoryItem, Folder } from "types";
import { Menu, Star, MoreHorizontal } from "react-feather";
import { NoteItem, ReactMouseEvent } from "types";
import { sortByFavorites, sortByLastUpdated, getNoteTitle } from "helpers";
import {
  toggleMainNav,
  toggleNoteOpen,
  swapNote,
  swapFolder,
  pruneNotes,
  swapCategory,
  addCategoryToNote
} from "slices/appStateSlice";
import _ from "lodash";
import NoteOptions from "./NoteOptions";

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
    favorites: note => !note.trash && !!note.favorite,
    trash: note => !!note.trash,
    all: note => !note.trash
  };
  const filteredNotes: NoteItem[] = notes
    .filter(filter[activeFolder])
    .filter(isMatch)
    .sort(sortByLastUpdated)
    .sort(sortByFavorites);

  const filteredCategories = categories.filter(
    ({ id }) => id !== activeCategoryId
  );

  const dispatch = useDispatch();

  const _setNavOpen = () => dispatch(toggleMainNav());
  const _setNoteOpen = () => dispatch(toggleNoteOpen());
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId));
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder));
  const _pruneNotes = () => dispatch(pruneNotes());
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ noteId, categoryId }));
  const _swapCategory = (categoryId: string) =>
    dispatch(swapCategory(categoryId));

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

  const [noteOptionsId, setNoteOptionsId] = useState("");
  const [noteOptionsPosition, setNoteOptionsPosition] = useState({
    x: 0,
    y: 0
  });
  const node = useRef<HTMLDivElement>(null);

  const handleNoteOptionsClick = (
    event: ReactMouseEvent,
    noteId: string = ""
  ): void => {
    if (
      event instanceof MouseEvent &&
      (event.target instanceof Element || event.target instanceof SVGElement)
    ) {
      if (event.target.classList.contains("note-options")) {
        setNoteOptionsPosition({ x: event.pageX, y: event.pageY });
      }
      if (event.target.parentElement instanceof Element) {
        if (event.target.parentElement.classList.contains("note-options")) {
          setNoteOptionsPosition({ x: event.pageX, y: event.pageY });
        }
      }
    }
    event.stopPropagation();

    if (node.current && node.current.contains(event.target as HTMLDivElement))
      return;
    setNoteOptionsId(!noteOptionsId || noteOptionsId !== noteId ? noteId : "");
  };

  const getOptionsYPoisition = (): Number => {
    // get the max window frame
    const MaxY = window.innerHeight;

    // determine approximate options height based on root font-size of 15px, padding, and select box.
    const optionsSize = 15 * 11;

    // if window position - noteOptions position isn't ibgger than options. flip it.
    return MaxY - noteOptionsPosition.y > optionsSize
      ? noteOptionsPosition.y
      : noteOptionsPosition.y - optionsSize;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleNoteOptionsClick);
    return () => {
      document.removeEventListener("mousedown", handleNoteOptionsClick);
    };
  });

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
              {noteOptionsId === note.id && (
                <div
                  ref={node}
                  className="note-options-context-menu"
                  style={{
                    position: "absolute",
                    top: getOptionsYPoisition() + "px",
                    left: noteOptionsPosition.x + "px"
                  }}
                  onClick={event => {
                    event.stopPropagation();
                  }}
                >
                  {!note.trash && filteredCategories.length > 0 && (
                    <>
                      <select
                        defaultValue=""
                        className="select"
                        onChange={event => {
                          _addCategoryToNote(event.target.value, note.id);

                          if (event.target.value !== activeCategoryId) {
                            _swapCategory(event.target.value);
                            _swapNote(note.id);
                            if (event.target.value === "") {
                              _swapFolder("all");
                            }
                          }

                          setNoteOptionsId("");
                        }}
                      >
                        <option disabled value="">
                          Move to category...
                        </option>
                        {filteredCategories
                          .filter(category => category.id !== note.category)
                          .map(category => (
                            <option key={category.id} value={category.id}>
                              {category.id}
                            </option>
                          ))}
                        {note.category && (
                          <option key="none" value="">
                            Remove category
                          </option>
                        )}
                      </select>
                    </>
                  )}
                  <NoteOptions clickedNote={note} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecondaryNav;
