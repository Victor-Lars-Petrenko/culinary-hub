import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipeById, fetchRecipes } from "../../api/recipes";
import { IRecipe, IRecipeDetails } from "../store.types";

export const fetchRecipesThunk = createAsyncThunk<
  IRecipe[],
  void,
  { rejectValue: string }
>("recipes/fetchRecipes", async (_, { rejectWithValue }) => {
  try {
    const recipes = await fetchRecipes();
    return recipes;
  } catch (error) {
    return rejectWithValue("Failed to load recipes. Please try again later.");
  }
});

export const fetchRecipeByIdThunk = createAsyncThunk<
  IRecipeDetails,
  string,
  { rejectValue: string }
>("recipes/fetchRecipeById", async (id, { rejectWithValue }) => {
  try {
    return await fetchRecipeById(id);
  } catch (error) {
    return rejectWithValue("Failed to load recipe details.");
  }
});
