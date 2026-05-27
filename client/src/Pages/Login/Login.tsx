import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert('אנא מלא את כל השדות');
      return;
    }

    // קבלת כל המשתמשים מה-localStorage
    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    // בדיקה אם המשתמש קיים עם שם משתמש וסיסמה תואמים
    const userExists = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!userExists) {
      alert('שם משתמש או סיסמה שגויים');
      return;
    }

    // אם נמצא משתמש, נשמור אותו ב-currentUser ונעבור ל-Library
    localStorage.setItem('currentUser', JSON.stringify(userExists));
    navigate('/library');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        כניסה
      </Typography>
      <Stack spacing={2} sx={{ mt: 4 }}>
        <TextField
          label="שם משתמש"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="סיסמה"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          התחבר
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;