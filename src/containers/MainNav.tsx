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
  Folder,
  X,
  Book
} from "react-feather";
import MainNavActionButton from "components/MainNavActionButton";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkTheme,
  updateCodeMirrorOptions,
  toggleAlternatesTool
} from "slices/appStateSlice";
import { RootState, CategoryItem } from "types";

interface IMainNavProps {}

const MainNav: React.FC<IMainNavProps> = props => {
  const dispatch = useDispatch();
  //console.log(dispatch({ type: "test" }));
  const { darkTheme, navOpen, activeFolder, categories } = useSelector(
    (state: RootState) => state.appState
  );

  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [addingTempCategory, setAddingTempCategory] = useState(false);
  const [tempCategoryName, setTempCategoryName] = useState("");

  const _addCategory = (category: CategoryItem) =>
    console.log("todo: add category action", category);

  const toggleTheme = () => {
    dispatch(toggleDarkTheme());
    dispatch(updateCodeMirrorOptions());
  };

  const toggleAlternates = () => {
    dispatch(toggleAlternatesTool());
  };

  const swapFolder = (folder: string) => {
    console.log("todo swap folder function", folder);
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
      categories.find(cat => cat.name === category.name) ||
      category.name === ""
    ) {
      resetTempCategory();
    } else {
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
          handler={toggleAlternates}
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
            handler={toggleTheme}
            icon={Sun}
            label={"choose theme"}
          />
        ) : (
          <MainNavActionButton
            handler={toggleTheme}
            icon={Moon}
            label={"choose theme"}
          />
        )}
      </section>
      <section className="main-nav-body">
        <div
          className={`main-nav-link ${activeFolder === "all" ? "active" : ""}`}
          onClick={() => {
            swapFolder("all");
          }}
        >
          <Book size={15} className="main-nav-icon" />
          All Notes
        </div>
        <div
          className={`main-nav-link ${
            activeFolder === "favourites" ? "active" : ""
          }`}
          onClick={() => swapFolder("favourites")}
        >
          <Star size={15} className="main-nav-icon" />
          Favourites
        </div>
        <div
          className={`main-nav-link ${
            activeFolder === "routes" ? "active" : ""
          }`}
          onClick={() => swapFolder("routes")}
        >
          <ArrowRightCircle size={15} className="main-nav-icon" />
          Routes
        </div>
        <div
          className={`main-nav-link ${
            activeFolder === "trash" ? "active" : ""
          }`}
          onClick={() => swapFolder("trash")}
        >
          <Trash2 size={15} className="main-nav-icon" />
          Trash
        </div>
        <div className="category-title">
          <h2>Categories</h2>
        </div>
        <div className="category-list">
          {categories.map(category => {
            return (
              <div key={category.id} className="category-list-each">
                <form className="category-list-name">
                  <Folder size={15} className="main-nav-icon" />
                  {editingCategoryId == category.id ? "" : category.name}
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
