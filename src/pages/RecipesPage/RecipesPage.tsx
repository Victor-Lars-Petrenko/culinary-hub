import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import {
  selectIsLoadingCategories,
  selectCategoriesError,
} from "../../redux/categories/selectors";
import { fetchRecipesThunk } from "../../redux/recipes/operations";
import { fetchCategoriesThunk } from "../../redux/categories/operations";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import useAppDispatch from "../../assets/hooks/useAppDispatch";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";

const RecipesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);
  const categoriesError = useSelector(selectCategoriesError);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {
    dispatch(fetchRecipesThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    const filtered = selectedCategory
      ? recipes.filter(recipe => recipe.strCategory === selectedCategory)
      : recipes;
    setFilteredRecipes(
      filtered.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [recipes, selectedCategory, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  if (isLoading || isLoadingCategories) return <CircularProgress />;
  if (error || categoriesError) return <div>Error loading data.</div>;

  return (
    <Box sx={{ p: 2 }}>
      <Filter
        selectedCategory={selectedCategory}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gap={4}
        mt={2}
      >
        {currentRecipes.map(recipe => (
          <Card key={recipe.idMeal}>
            <Link
              to={`/recipes/${recipe.idMeal}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardMedia
                component="img"
                alt={recipe.strMeal}
                height="140"
                image={recipe.strMealThumb}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {recipe.strMeal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {recipe.strCategory} | Area: {recipe.strArea}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
      <Pagination
        count={Math.ceil(filteredRecipes.length / recipesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
        sx={{ mt: 4 }}
      />
    </Box>
  );
};

export default RecipesPage;
