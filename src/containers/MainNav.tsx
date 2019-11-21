import React, { useState } from "react";
import { uuid } from "uuidv4";
import {
  Sun,
  Moon,
  Globe,
  Plus,
  Star,
  Trash2,
  ArrowRightCircle,
  Folder as FolderIcon,
  X,
  Book
} from "react-feather";
import MainNavActionButton from "components/MainNavActionButton";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool,
  swapCategory,
  swapFolder,
  addCategory,
  addNote,
  swapNote
} from "slices/appStateSlice";
import { RootState, CategoryItem, Folder, NoteItem } from "types";
import { newNote } from "helpers";

interface IMainNavProps {}

const MainNav: React.FC<IMainNavProps> = props => {
  const dispatch = useDispatch();
  //console.log(dispatch({ type: "test" }));
  const {
    darkTheme,
    navOpen,
    activeFolder,
    categories,
    activeNoteId,
    activeCategoryId,
    notes
  } = useSelector((state: RootState) => state.appState);

  const activeNote = notes.find(note => note.id === activeNoteId);

  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState("");

  const _addCategory = (category: CategoryItem) =>
    dispatch(addCategory(category));

  const _toggleDarkTheme = () => {
    dispatch(toggleDarkTheme());
    dispatch(updateCodeMirrorOptions());
  };

  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder));

  const _swapCategory = (categoryId: string) =>
    dispatch(swapCategory(categoryId));

  const _addNote = (note: NoteItem) => {
    dispatch(addNote(note));
  };
  const _swapNote = (noteId: string) => {
    dispatch(swapNote(noteId));
  };

  const handleSwapFolder = (folder: Folder) => {
    _swapFolder(folder);
  };

  const handleSwapCategory = (categoryId: string) => {
    _swapCategory(categoryId);
  };

  const handleNewNote = () => {
    if (activeFolder === "trash") {
      _swapFolder("all");
    }
    if ((activeNote && activeNote.text !== "") || !activeNote) {
      const note = newNote(
        activeCategoryId,
        activeFolder === "favourites" ? "favourites" : "all"
      );
      _addNote(note);
      _swapNote(note.id);
    }
  };

  const toggleAlternates = () => {
    dispatch(toggleAlternatesTool());
  };

  const newTempCategoryHandler = () => {
    setAddingTempCategory(!addingTempCategory);
  };

  const onSubmitNewCategory = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    const category = {
      id: uuid(),
      name: tempCategoryName.trim(),
      draggedOver: false
    };

    if (
      categories.find(cat => cat.id === category.id) ||
      category.name === ""
    ) {
      resetTempCategory();
    } else {
      console.log("adding category, ", category);
      _addCategory(category);
      resetTempCategory();
    }
  };
  const resetTempCategory = () => {
    setTempCategoryName("");
    setAddingTempCategory(false);
    setEditingCategoryId("");
  };

  return (
    <aside className={navOpen ? "main-nav open" : "main-nav"}>
      <section className="main-nav-actions">
        <MainNavActionButton
          handler={handleNewNote}
          icon={Plus}
          label={"Add Note"}
        />
        <MainNavActionButton
          handler={toggleAlternates}
          icon={Globe}
          label={"Alternates Tool"}
        />
        {darkTheme ? (
          <MainNavActionButton
            handler={_toggleDarkTheme}
            icon={Sun}
            label={"choose theme"}
          />
        ) : (
          <MainNavActionButton
            handler={_toggleDarkTheme}
            icon={Moon}
            label={"choose theme"}
          />
        )}
      </section>
      <section className="main-nav-body">
        <div
          className={`main-nav-link ${activeFolder === "all" ? "active" : ""}`}
          onClick={() => {
            handleSwapFolder("all");
          }}
        >
          <Book size={15} className="main-nav-icon" />
          All Notes
        </div>
        <div
          className={`main-nav-link ${
            activeFolder === "favourites" ? "active" : ""
          }`}
          onClick={() => handleSwapFolder("favourites")}
        >
          <Star size={15} className="main-nav-icon" />
          Favourites
        </div>
        {/* <div
          className={`main-nav-link ${
            activeFolder === "routes" ? "active" : ""
          }`}
          onClick={() => handleSwapFolder("routes")}
        >
          <ArrowRightCircle size={15} className="main-nav-icon" />
          Routes
        </div> */}
        <div
          className={`main-nav-link ${
            activeFolder === "trash" ? "active" : ""
          }`}
          onClick={() => handleSwapFolder("trash")}
        >
          <Trash2 size={15} className="main-nav-icon" />
          Trash
        </div>
        <div className="category-title">
          <h2>Categories</h2>
        </div>
        <div className="category-list">
          <div
            className="category-list-each"
            onClick={() => handleSwapCategory("routes")}
          >
            <div className="category-list-name">
              <ArrowRightCircle size={15} className="main-nav-icon" />
              Routes
            </div>
          </div>

          {categories.map(category => {
            return (
              <div
                key={category.id}
                className="category-list-each"
                onClick={() => handleSwapCategory(category.id)}
              >
                <form className="category-list-name">
                  <FolderIcon size={15} className="main-nav-icon" />
                  {editingCategoryId === category.id ? "" : category.id}
                </form>
                <div className="category-options">
                  <X size={12} aria-label="Remove category" />
                </div>
              </div>
            );
          })}
        </div>

        {!addingTempCategory && (
          <button
            className="category-button"
            onClick={newTempCategoryHandler}
            aria-label="Add category"
          >
            <Plus size={15} />
            Add Category
          </button>
        )}
        {addingTempCategory && (
          <form className="category-form" onSubmit={onSubmitNewCategory}>
            <input
              aria-label="Category name"
              type="text"
              autoFocus
              maxLength={20}
              placeholder="New category..."
              onChange={event => {
                setTempCategoryName(event.target.value);
              }}
              onBlur={event => {
                if (!tempCategoryName || tempCategoryName.trim() === "") {
                  resetTempCategory();
                } else {
                  onSubmitNewCategory(event);
                }
              }}
            />
          </form>
        )}
      </section>
      <section className="main-nav-synced">Sync</section>
    </aside>
  );
};

export default MainNav;
