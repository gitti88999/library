import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from'./components/Home/Home'
import Login from './components/Login/Login'
import MyBooks from './components/MyBooks/MyBooks'

function App() {
  const [count, setCount] = useState(0)

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
