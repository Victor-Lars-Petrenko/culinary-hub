import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeByIdThunk } from "../../redux/recipes/operations";
import {
  selectRecipeById,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import useAppDispatch from "../../assets/hooks/useAppDispatch";

const RecipeDetailsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const recipe = useSelector(selectRecipeById);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeByIdThunk(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!recipe) return null;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {recipe.strMeal}
      </Typography>
      <Box
        component="img"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width="100%"
        sx={{ borderRadius: 2, boxShadow: 3 }}
      />
      <Typography variant="h6" gutterBottom>
        Category: {recipe.strCategory}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Area: {recipe.strArea}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {recipe.strInstructions}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Ingredients:
      </Typography>
      <Box component="ul" sx={{ listStyleType: "none", padding: 0 }}>
        {[...Array(20)].map((_, index) => {
          const ingredient =
            recipe[`strIngredient${index + 1}` as keyof typeof recipe];
          const measure =
            recipe[`strMeasure${index + 1}` as keyof typeof recipe];
          return (
            ingredient && (
              <Box
                component="li"
                key={index}
                sx={{ padding: "4px 0", borderBottom: "1px solid #ddd" }}
              >
                {ingredient} - {measure}
              </Box>
            )
          );
        })}
      </Box>

      {recipe.strYoutube && (
        <Box mt={2}>
          <Typography variant="h6">Video:</Typography>
          <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDetailsPage;
