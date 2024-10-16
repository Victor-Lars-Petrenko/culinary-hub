import { CaseReducer, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { ICategoriesState, IRecipesState } from "../../redux/store.types";

export const pendingRecipes: CaseReducer<IRecipesState> = state => {
  state.isLoading = true;
  state.error = null;
};

export const rejectedRecipes: CaseReducer<
  IRecipesState,
  PayloadAction<
    string | undefined,
    string,
    {
      arg: void;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | ({ rejectedWithValue: false } & {})
    ),
    SerializedError
  >
> = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = payload || error.message || "Unknown error occurred";
};

export const rejectedRecipeDetails: CaseReducer<
  IRecipesState,
  PayloadAction<
    string | undefined,
    string,
    {
      arg: string;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | ({ rejectedWithValue: false } & {})
    ),
    SerializedError
  >
> = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = payload || error.message || "Unknown error occurred";
};

export const pendingCategories: CaseReducer<ICategoriesState> = state => {
  state.isLoading = true;
  state.error = null;
};

export const rejectedCategories: CaseReducer<
  ICategoriesState,
  PayloadAction<
    string | undefined,
    string,
    {
      arg: void;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & (
      | {
          rejectedWithValue: true;
        }
      | ({ rejectedWithValue: false } & {})
    ),
    SerializedError
  >
> = (state, { payload, error }) => {
  state.isLoading = false;
  state.error = payload || error.message || "Unknown error occurred";
};
