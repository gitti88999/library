// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

interface Props {
  isLoggedIn: boolean;
}

const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>

        {!isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}

        {isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/library">Library</Button>
            <Button color="inherit" component={Link} to="/search">Search</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;