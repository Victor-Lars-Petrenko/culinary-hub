import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipesThunk, fetchRecipeByIdThunk } from "./operations";
import {
  pendingRecipes,
  rejectedRecipeDetails,
  rejectedRecipes,
} from "../../assets/functions/redux";
import { IRecipe, IRecipesState, IRecipeDetails } from "../store.types";

export const initialState: IRecipesState = {
  recipes: [],
  isLoading: false,
  error: null,
  recipeDetails: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesThunk.pending, pendingRecipes)
      .addCase(
        fetchRecipesThunk.fulfilled,
        (state, action: PayloadAction<IRecipe[]>) => {
          state.isLoading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipesThunk.rejected, rejectedRecipes)

      .addCase(fetchRecipeByIdThunk.pending, pendingRecipes)
      .addCase(
        fetchRecipeByIdThunk.fulfilled,
        (state, action: PayloadAction<IRecipeDetails>) => {
          state.isLoading = false;
          state.recipeDetails = action.payload;
        }
      )
      .addCase(fetchRecipeByIdThunk.rejected, rejectedRecipeDetails);
  },
});

export default recipesSlice.reducer;
