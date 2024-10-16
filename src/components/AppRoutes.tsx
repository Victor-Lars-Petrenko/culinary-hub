import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesPage from "../pages/RecipesPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
