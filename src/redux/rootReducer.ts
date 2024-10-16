import { combineReducers } from "@reduxjs/toolkit";
import recipesReducer from "./recipes/slice";
import categoriesReducer from "./categories/slice";

const rootReducer = combineReducers({
  recipes: recipesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
