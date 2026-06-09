import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface Props {
  isLoggedIn: boolean;
  toggleTheme: () => void;
  currentMode: "light" | "dark";
}

const Navbar: React.FC<Props> = ({ isLoggedIn, toggleTheme, currentMode }) => {
  return (
    <AppBar position="sticky" sx={{ top: 0, zIndex: 1100 }}>
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

        {/* כפתור החלפת Theme */}
        <IconButton color="inherit" onClick={toggleTheme}>
          {currentMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;