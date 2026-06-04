
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom';
// import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login';
// import Register from './Pages/Register/Register';
// import Library from './Pages/Library/Library';
// import Search from './Pages/Search/Search';
// import { ThemeProvider, CssBaseline } from '@mui/material';
// import theme from './Theme';
// import type { Book } from './types/book';
// // import { router } from "./router";

// interface User {
//   username: string;
//   password: string;
//   books: Book[];
// }
// const App: React.FC = () => {
//   const [currentUser, setCurrentUser] = useState<User | null>(
//     JSON.parse(localStorage.getItem('currentUser') || 'null')
//   );
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           {/* <Route path="/MyBooks" element={<MyBooks />} /> */}
//           <Route path="/login" element={<Login />} />
//           {/* Passing setCurrentUser to Register */}
//           <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
//           <Route
//             path="/library"
//             element={<Library books={currentUser?.books || []} onDelete={() => {}} />}
//           />
//           <Route path="/search" element={<Search books={[]} />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//     // <ThemeProvider theme={theme}>
//     //   <CssBaseline />
//     //   <RouterProvider router={router} />
//     // </ThemeProvider>
//     );
// }

// export default App;
// App.tsx
// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import theme from "./Theme";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Library from "./Pages/Library/Library";
import Search from "./Pages/Search/Search";
import BorrowBook from "./Pages/BorrowBook/BorrowBook";
import Navbar from "./components/Home/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import type { RootState } from "./store/store";

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/library" /> : <Login />}
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library books={user?.books || []} onDelete={() => {}} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search books={user?.books || []} />
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
    </ThemeProvider>
  );
};

export default App;