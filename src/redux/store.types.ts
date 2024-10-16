export interface IRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

export interface IRecipesState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: string | null;
}

export interface ICategory {
  strCategory: string;
}

export interface ICategoriesState {
  categories: ICategory[];
  isLoading: boolean;
  error: string | null;
}
