import React, { useState } from "react";
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
  toggleAlternatesTool,
  swapCategory,
  swapFolder,
  addCategory,
  addNote,
  swapNote,
  deleteCategory,
  updateCategory
} from "slices/appStateSlice";

import {
  toggleDarkTheme,
  updateCodeMirrorOptions
} from "slices/settingsStateSlice";

import {
  RootState,
  CategoryItem,
  Folder,
  NoteItem,
  ReactSubmitEvent
} from "types";

import { newNote } from "helpers";

interface IMainNavProps {}

const MainNav: React.FC<IMainNavProps> = props => {
  const dispatch = useDispatch();
  //console.log(dispatch({ type: "test" }));
  const {
    navOpen,
    activeFolder,
    categories,
    activeNoteId,
    activeCategoryId,
    notes
  } = useSelector((state: RootState) => state.appState);

  const { darkTheme } = useSelector((state: RootState) => state.settingsState);

  const activeNote = notes.find(note => note.id === activeNoteId);

  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState("");

  const _addCategory = (category: CategoryItem) =>
    dispatch(addCategory(category));

  const _toggleDarkTheme = () => dispatch(toggleDarkTheme());
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOptions({ key, value }));

  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder));

  const _swapCategory = (categoryId: string) =>
    dispatch(swapCategory(categoryId));

  const _addNote = (note: NoteItem) => {
    dispatch(addNote(note));
  };
  const _swapNote = (noteId: string) => {
    dispatch(swapNote(noteId));
  };

  const _updateCategory = (oldId: string, newId: string) => {
    dispatch(updateCategory({ oldId, newId }));
  };

  const _deleteCategory = (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
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
        activeFolder === "favorites" ? "favorites" : "all"
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
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme();
    _updateCodeMirrorOption("theme", darkTheme ? "base16-light" : "new-moon");
  };

  const onSubmitNewCategory = (event: ReactSubmitEvent) => {
    event.preventDefault();

    const category = {
      id: tempCategoryName,
      name: tempCategoryName.trim(),
      draggedOver: false
    };

    if (
      categories.find(cat => cat.id === category.id) ||
      category.name === ""
    ) {
      resetTempCategory();
    } else {
      _addCategory(category);
      resetTempCategory();
    }
  };

  const onSubmitUpdateCategory = (event: ReactSubmitEvent, oldCat: string) => {
    event.preventDefault();

    const category = {
      id: tempCategoryName.trim(),
      name: tempCategoryName.trim(),
      draggedOver: false
    };

    if (
      categories.find(cat => cat.id === category.id) ||
      category.name === ""
    ) {
      resetTempCategory();
    } else {
      console.log("submitting ", tempCategoryName);
      _updateCategory(oldCat, category.id);
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
            handler={toggleDarkThemeHandler}
            icon={Sun}
            label={"choose theme"}
          />
        ) : (
          <MainNavActionButton
            handler={toggleDarkThemeHandler}
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
            activeFolder === "favorites" ? "active" : ""
          }`}
          onClick={() => handleSwapFolder("favorites")}
        >
          <Star size={15} className="main-nav-icon" />
          Favorites
        </div>
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
                className={`category-list-each ${
                  category.id === activeCategoryId ? "active" : ""
                }`}
                onClick={() => handleSwapCategory(category.id)}
                onDoubleClick={() => {
                  setEditingCategoryId(category.id);
                  setTempCategoryName(category.id);
                }}
                onBlur={() => {
                  setEditingCategoryId("");
                }}
              >
                <form
                  className="category-list-name"
                  onSubmit={event => {
                    event.preventDefault();
                    setEditingCategoryId("");
                    onSubmitUpdateCategory(event, category.id);
                  }}
                >
                  <FolderIcon size={15} className="main-nav-icon" />
                  {editingCategoryId === category.id ? (
                    <input
                      type="text"
                      autoFocus
                      maxLength={20}
                      className="category-edit"
                      value={tempCategoryName}
                      onChange={event => {
                        setTempCategoryName(event.target.value);
                      }}
                      onBlur={event => {
                        resetTempCategory();
                      }}
                    />
                  ) : (
                    category.id
                  )}
                </form>
                <div
                  className="category-options"
                  onClick={() => {
                    const notesNotTrash = notes.filter(note => !note.trash);
                    const newNoteId =
                      notesNotTrash.length > 0 ? notesNotTrash[0].id : "";

                    _deleteCategory(category.id);
                    // _pruneCategoryFromNotes(category.id)
                    _swapFolder("all");
                    _swapNote(newNoteId);
                  }}
                >
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
