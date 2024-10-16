import React from "react";
import { Routes, Route } from "react-router-dom";
import RecipesPage from "../pages/RecipesPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
    </Routes>
  );
};

export default AppRoutes;
