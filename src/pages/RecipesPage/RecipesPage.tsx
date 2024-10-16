import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import {
  selectCategories,
  selectIsLoadingCategories,
  selectCategoriesError,
} from "../../redux/categories/selectors";
import { fetchRecipesThunk } from "../../redux/recipes/operations";
import { fetchCategoriesThunk } from "../../redux/categories/operations";
import {
  TextField,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { debounce } from "lodash";
import useAppDispatch from "../../assets/hooks/useAppDispatch";
import { ICategory } from "../../redux/store.types";
import { Link } from "react-router-dom";

const RecipesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);
  const categoriesError = useSelector(selectCategoriesError);

  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    300
  );

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

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
      <TextField
        label="Search recipes"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category: ICategory) => (
            <MenuItem key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
