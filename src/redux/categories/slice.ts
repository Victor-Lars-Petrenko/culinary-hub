import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategoriesThunk } from "./operations";
import {
  pendingCategories,
  rejectedCategories,
} from "../../assets/functions/redux";
import { ICategoriesState, ICategory } from "../store.types";

const initialState: ICategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoriesThunk.pending, pendingCategories)
      .addCase(
        fetchCategoriesThunk.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.isLoading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategoriesThunk.rejected, rejectedCategories);
  },
});

export default categoriesSlice.reducer;
