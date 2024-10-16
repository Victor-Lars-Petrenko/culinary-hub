import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api/categories";
import { ICategory } from "../store.types";

export const fetchCategoriesThunk = createAsyncThunk<
  ICategory[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const categories = await fetchCategories();
    return categories;
  } catch (error) {
    return rejectWithValue(
      "Failed to load categories. Please try again later."
    );
  }
});
