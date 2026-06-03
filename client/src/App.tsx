
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
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Library from './Pages/Library/Library';
import Search from './Pages/Search/Search';
import Navbar from '../src/components/Home/NavBar';
import BorrowBook from "./Pages/BorrowBook/BorrowBook";
import type { BookDTO } from './types/book';

interface User {
  username: string;
  password: string;
  books: BookDTO[];
}

interface AppRoute {
  path: string;
  element: React.ReactNode;
  authRequired?: boolean;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  const isLoggedIn = !!currentUser;

  // קומפוננטת הגנה
  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
  };

  const routes: AppRoute[] = [
    { path: '/', element: <Home /> },
    {
      path: '/login',
      element: isLoggedIn ? <Navigate to="/library" /> : <Login setCurrentUser={setCurrentUser} />
    },
    {
      path: '/register',
      element: <Register setCurrentUser={setCurrentUser} />
    },
    {
      path: '/library',
      element: (
        <ProtectedRoute>
          <Library books={currentUser?.books || []} onDelete={() => { }} />
        </ProtectedRoute>
      ),
      authRequired: true
    },
    {
      path: '/search',
      element: (
        <ProtectedRoute>
          <Search books={currentUser?.books || []} />
        </ProtectedRoute>
      ),
      authRequired: true
    },
    {
      path: '/borrow/:id',
      element: (
        <ProtectedRoute>
          <BorrowBook />
        </ProtectedRoute>
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;