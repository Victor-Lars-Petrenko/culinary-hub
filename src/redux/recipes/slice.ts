import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRecipesThunk } from "./operations";
import { pending, rejected } from "../../assets/functions/redux";
import { IRecipe, IRecipesState } from "../store.types";

export const initialState: IRecipesState = {
  recipes: [],
  isLoading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRecipesThunk.pending, pending)
      .addCase(
        fetchRecipesThunk.fulfilled,
        (state, action: PayloadAction<IRecipe[]>) => {
          state.isLoading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipesThunk.rejected, rejected);
  },
});

export default recipesSlice.reducer;
