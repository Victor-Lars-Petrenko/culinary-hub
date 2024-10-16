import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import { fetchRecipesThunk } from "../../redux/recipes/operations";
import {
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { debounce } from "lodash";
import useAppDispatch from "../../assets/hooks/useAppDispatch";

const RecipesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  useEffect(() => {
    dispatch(fetchRecipesThunk());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
      const filtered = recipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredRecipes(filtered);
    },
    300
  );

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

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TextField
        label="Search recipes"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <Grid container spacing={4}>
        {currentRecipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
            <Card>
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
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredRecipes.length / recipesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
      />
    </div>
  );
};

export default RecipesPage;
