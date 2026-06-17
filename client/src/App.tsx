import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import { getTheme, rtlCache } from "./Theme";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Library from "./Pages/Library";
import Search from "./Pages/Search";
import BorrowBook from "./Pages/BorrowBook";
import Navbar from "./components/Home/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import type { RootState } from "./app/store";

const App: React.FC = () => {
  const user = useSelector(
  (state: RootState) => state.myUser.currentUser
);
  // const isLoggedIn = !!user;
  const isLoggedIn = !!user?.id;

  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode: "light" | "dark" = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div dir="rtl">
          <Router>
            <Navbar
              isLoggedIn={isLoggedIn}
              toggleTheme={toggleTheme}
              currentMode={mode}
            />

            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route path="/register" element={<Register />} />

              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <Search />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/borrow/:id"
                element={
                  <ProtectedRoute>
                    <BorrowBook />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;