import axios from "axios";
import { IRecipe } from "../redux/store.types";

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
