import axios from "axios";
import { IRecipe, IRecipeDetails } from "../redux/store.types";

export const fetchRecipes = async (): Promise<IRecipe[]> => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    return response.data.meals;
  } catch (error) {
    throw new Error("Failed to fetch recipes.");
  }
};

export const fetchRecipeById = async (id: string): Promise<IRecipeDetails> => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    return response.data.meals[0];
  } catch (error) {
    throw new Error("Failed to fetch recipe details.");
  }
};
