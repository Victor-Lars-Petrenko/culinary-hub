import axios from "axios";
import { ICategory } from "../redux/store.types";

export const fetchCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    return response.data.meals;
  } catch (error) {
    throw new Error("Failed to fetch categories.");
  }
};
