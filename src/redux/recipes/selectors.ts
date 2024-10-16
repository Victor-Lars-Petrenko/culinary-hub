import { RootState } from "../store";

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectIsLoading = (state: RootState) => state.recipes.isLoading;
export const selectError = (state: RootState) => state.recipes.error;
export const selectRecipeById = (state: RootState) =>
  state.recipes.recipeDetails;
