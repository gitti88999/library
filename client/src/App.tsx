
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Library from './Pages/Library/Library';
import Search from './Pages/Search/Search';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme';
import type { Book } from './types/book';
import MyBooks from './components/MyBooks/MyBooks';

interface User {
  username: string;
  password: string;
  books: Book[];
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Passing setCurrentUser to Register */}
          <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
          <Route
            path="/library"
            element={<Library books={currentUser?.books || []} onDelete={() => {}} />}
          />
          <Route path="/search" element={<Search books={[]} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
export default App;
