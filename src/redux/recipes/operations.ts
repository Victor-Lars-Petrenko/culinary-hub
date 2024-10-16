import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes } from "../../api/recipes";
import { IRecipe } from "../store.types";

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
