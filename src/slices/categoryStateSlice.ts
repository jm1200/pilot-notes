import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryState, CategoryItem } from "types";

const initialState: CategoryState = {
  categories: [],
  error: "",
  loading: true
};

const categoryStateSlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    loadCategories(state: CategoryState) {
      state.loading = true;
    },
    loadCategoriesSuccess(
      state: CategoryState,
      action: PayloadAction<CategoryItem[]>
    ) {
      state.categories = action.payload;
      state.loading = false;
    },
    loadCategoriesError(state: CategoryState, action: PayloadAction<string>) {
      console.log("load cat error, ", action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    updateCategory(
      state: CategoryState,
      action: PayloadAction<{ oldId: string; newId: string }>
    ) {
      const { oldId, newId } = action.payload;
      state.categories = state.categories.map(category =>
        category.id === oldId ? { name: newId, id: newId } : category
      );
    },
    deleteCategory(state: CategoryState, action: PayloadAction<string>) {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        category => category.id !== categoryId
      );
    },
    addCategory(state: CategoryState, action: PayloadAction<CategoryItem>) {
      const newCategory = action.payload;
      state.categories.push(newCategory);
    }
  }
});

export const {
  updateCategory,
  deleteCategory,
  addCategory,
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesError
} = categoryStateSlice.actions;

export default categoryStateSlice.reducer;
