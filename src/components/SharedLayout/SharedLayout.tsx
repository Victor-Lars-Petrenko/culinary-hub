import { Box } from "@mui/material";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import React from "react";

const SharedLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <Box component="main" sx={{ padding: 3 }}>
        <Outlet />
      </Box>
    </div>
  );
};

export default SharedLayout;
