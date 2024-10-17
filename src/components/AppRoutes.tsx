import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import SharedLayout from "./SharedLayout";

const RecipesPage = lazy(() => import("../pages/RecipesPage"));
const IngredientsPage = lazy(() => import("../pages/IngredientsPage"));
const RecipeDetailsPage = lazy(() => import("../pages/RecipeDetailsPage"));

const AppRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<RecipesPage />} />
          <Route path="ingredients" element={<IngredientsPage />} />
          <Route path="recipes/:id" element={<RecipeDetailsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
