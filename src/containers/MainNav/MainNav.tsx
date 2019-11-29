import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  Sun,
  Moon,
  Globe,
  PlusCircle,
  Plus,
  Star,
  Trash2,
  ArrowRightCircle,
  Folder as FolderIcon,
  X,
  Book,
  Check,
  Edit,
  FileText
} from "react-feather";

import MainNavActionButton from "components/MainNavActionButton/MainNavActionButton";

import { toggleAlternatesTool } from "slices/appStateSlice";

import {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  togglePreviewMarkdown,
  setPreviewMarkdown
} from "slices/settingsStateSlice";

import {
  swapCategory,
  setActiveCategory,
  addNote,
  swapFolder,
  swapNote
} from "slices/noteStateSlice";

import {
  addCategory,
  deleteCategory,
  updateCategory
} from "slices/categoryStateSlice";

import {
  CategoryItem,
  Folder,
  NoteItem,
  ReactSubmitEvent,
  ReactMouseEvent
} from "types";

import { newNote, newRouteNote } from "helpers";

import {
  MainNavContainer,
  MainNavActions,
  MainNavBody,
  MainNavBodyBottomSection,
  MainNavBodyTopSection,
  Synced,
  CategoryTitle,
  MainNavLink,
  CategoryList,
  CategoryListEach,
  AddCategoryButton,
  AddCategoryForm
} from "./MainNav.styles";

interface IMainNavProps {
  notes: NoteItem[];
  categories: CategoryItem[];
  darkThemeSetting: boolean;
  activeNoteId: string;
  activeCategoryId: string;
  activeFolder: Folder;
  navOpen: boolean;
  lastSynced: string;
  previewMarkdown: boolean;
}

const MainNav: React.FC<IMainNavProps> = ({
  notes,
  categories,
  darkThemeSetting,
  activeNoteId,
  activeCategoryId,
  activeFolder,
  navOpen,
  lastSynced,
  previewMarkdown
}) => {
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState("");

  const activeNote = notes.find(note => note.id === activeNoteId);

  const dispatch = useDispatch();
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
  const _setActiveCategory = (noteId: string) => {
    dispatch(setActiveCategory(noteId));
  };

  const _updateCategory = (oldId: string, newId: string) => {
    dispatch(updateCategory({ oldId, newId }));
  };

  const _deleteCategory = (categoryId: string) => {
    dispatch(deleteCategory(categoryId));
  };
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown());
  const _setPreviewMarkdown = (bool: boolean) =>
    dispatch(setPreviewMarkdown(bool));

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
      _setPreviewMarkdown(false);
    }
  };

  const handleNewRouteNote = (e: ReactMouseEvent) => {
    e.stopPropagation();
    if (activeFolder === "trash") {
      _swapFolder("all");
    }

    if (
      (activeNote &&
        activeNote.text !== "" &&
        activeNote &&
        !activeNote.text.slice(0, 20).includes("# New Route Title")) ||
      !activeNote
    ) {
      const note = newRouteNote(
        "routes",
        activeFolder === "favorites" ? "favorites" : "all"
      );
      _addNote(note);
      _setActiveCategory("routes");
      _swapNote(note.id);
      _setPreviewMarkdown(false);
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
    _updateCodeMirrorOption(
      "theme",
      darkThemeSetting ? "base16-light" : "new-moon"
    );
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
    <MainNavContainer className={navOpen ? "main-nav open" : "main-nav"}>
      <MainNavActions>
        <MainNavActionButton
          handler={handleNewNote}
          icon={Plus}
          label={"Add Note"}
        />
        {previewMarkdown ? (
          <MainNavActionButton
            handler={_togglePreviewMarkdown}
            icon={Edit}
            label={"Edit Mode"}
          />
        ) : (
          <MainNavActionButton
            handler={_togglePreviewMarkdown}
            icon={FileText}
            label={"Preview Mode"}
          />
        )}

        {darkThemeSetting ? (
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
      </MainNavActions>
      <MainNavBody>
        <MainNavBodyTopSection>
          <MainNavLink
            className={`main-nav-link ${
              activeFolder === "all" ? "active" : ""
            }`}
            onClick={() => {
              handleSwapFolder("all");
            }}
          >
            <Book size={15} className="main-nav-icon" />
            All Notes
          </MainNavLink>
          <MainNavLink
            className={`main-nav-link ${
              activeFolder === "favorites" ? "active" : ""
            }`}
            onClick={() => handleSwapFolder("favorites")}
          >
            <Star size={15} className="main-nav-icon" />
            Favorites
          </MainNavLink>
          <MainNavLink
            className={`main-nav-link ${
              activeFolder === "trash" ? "active" : ""
            }`}
            onClick={() => handleSwapFolder("trash")}
          >
            <Trash2 size={15} className="main-nav-icon" />
            Trash
          </MainNavLink>

          <CategoryTitle>Categories</CategoryTitle>

          <CategoryList>
            <CategoryListEach
              className={`category-list-each ${
                activeCategoryId === "routes" ? "active" : ""
              }`}
              onClick={() => handleSwapCategory("routes")}
            >
              <div className="category-list-name">
                <ArrowRightCircle size={15} className="main-nav-icon" />
                Routes
              </div>
              <div
                className="category-options"
                onClick={e => handleNewRouteNote(e)}
              >
                <PlusCircle size={16} aria-label="Remove category" />
              </div>
            </CategoryListEach>

            {categories.map(category => {
              //console.log("category map: ", category.id);
              return (
                <CategoryListEach
                  key={category.id}
                  className={`category-list-each ${
                    category.id === activeCategoryId ? "active" : ""
                  }`}
                  onClick={() => handleSwapCategory(category.id)}
                  onDoubleClick={() => {
                    console.log("double click:", category.id);
                    setEditingCategoryId(category.id);
                    setTempCategoryName(category.id);
                  }}
                  onBlur={() => {
                    setEditingCategoryId("");
                  }}
                >
                  <FolderIcon size={15} className="main-nav-icon" />
                  {editingCategoryId === category.id ? (
                    <form
                      className="category-list-name"
                      onSubmit={event => {
                        event.preventDefault();
                        setEditingCategoryId("");
                        onSubmitUpdateCategory(event, category.id);
                      }}
                    >
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
                    </form>
                  ) : (
                    <div className="category-list-name">{category.id}</div>
                  )}

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
                </CategoryListEach>
              );
            })}
          </CategoryList>

          {!addingTempCategory && (
            <AddCategoryButton
              className="category-button"
              onClick={newTempCategoryHandler}
              aria-label="Add category"
            >
              <Plus size={15} />
              Add Category
            </AddCategoryButton>
          )}
          {addingTempCategory && (
            <AddCategoryForm onSubmit={onSubmitNewCategory}>
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
            </AddCategoryForm>
          )}
        </MainNavBodyTopSection>
        <MainNavBodyBottomSection>
          <CategoryTitle>tools</CategoryTitle>
          <CategoryList>
            <CategoryListEach onClick={toggleAlternates}>
              <MainNavActionButton
                handler={() => {}}
                icon={Globe}
                label={"Alternates Tool"}
              />
              <div className="category-list-name">Alternates Tool</div>
            </CategoryListEach>
            <CategoryListEach onClick={() => {}}>
              <MainNavActionButton
                handler={() => {}}
                icon={Plus}
                label={"Marketplace"}
                disabled
              />
              <div className="category-list-name">MarketPlace</div>
            </CategoryListEach>
            <CategoryListEach onClick={() => {}}>
              <MainNavActionButton
                handler={() => {}}
                icon={X}
                label={"New Feature"}
                disabled
              />
              <div className="category-list-name">New Feature</div>
            </CategoryListEach>
          </CategoryList>
        </MainNavBodyBottomSection>
      </MainNavBody>
      {lastSynced && (
        <Synced className="main-nav-synced">
          <div className="last-synced">
            <Check size={14} className="main-nav-icon" />{" "}
            {moment(lastSynced).format("h:mm A on M/D/Y")}
          </div>
        </Synced>
      )}
    </MainNavContainer>
  );
};

export default MainNav;
