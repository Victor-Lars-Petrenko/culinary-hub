import { RootState } from "../store";

export const selectCategories = (state: RootState) =>
  state.categories.categories;
export const selectIsLoadingCategories = (state: RootState) =>
  state.categories.isLoading;
export const selectCategoriesError = (state: RootState) =>
  state.categories.error;
