// // import { createBrowserRouter } from "react-router-dom";
// // import Home from "./Pages/Home/Home";
// // import Login from "./Pages/Login/Login";
// // import Register from "./Pages/Register/Register";
// // import Library from "./Pages/Library/Library";
// // import Search from "./Pages/Search/Search";
// // import MyBooks from "./components/MyBooks/MyBooks";
// // import type { Book } from './types/book';
// // import { useState } from "react";

// // export const router = createBrowserRouter([
// //     { path: "/", element: <Home /> },
// //     { path: "/login", element: <Login /> },
// //     { path: "/register:CurrentUser", element: <Register setCurrentUser={setCurrentUser}/> },
// //     { path: "/library", element: <Library books={[]} onDelete={() => {}} /> },
// //     { path: "/search", element: <Search books={[]} /> },

// // ]);
// // router.tsx
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import Home from "./Pages/Home/Home";
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// import Library from "./Pages/Library/Library";
// import Search from "./Pages/Search/Search";
// import Layout from "./Layout";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Navigate to="/login" />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/register",
//     element: <Register />
//   },
//   {
//     path: "/app",
//     element: <Layout />, // כולל Navbar
//     children: [
//       {
//         path: "library",
//         element: <Library />
//       },
//       {
//         path: "search",
//         element: <Search />
//       }
//     ]
//   }
// ]);