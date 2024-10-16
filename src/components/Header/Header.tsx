import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Culinary Hub
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Recipes
          </Button>
          <Button color="inherit" component={Link} to="/ingredients">
            Ingredients
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
