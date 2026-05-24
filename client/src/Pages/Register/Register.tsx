import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  password: string;
  books: any[];
}

interface Props {
  setCurrentUser: (user: User) => void;
}

const Register: React.FC<Props> = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert('אנא מלא את כל השדות');
      return;
    }
    if (password !== confirmPassword) {
      alert('הסיסמאות לא תואמות');
      return;
    }

    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];

    if (users.some(u => u.username === username)) {
      alert('שם המשתמש כבר קיים');
      return;
    }

    const newUser: User = { username, password, books: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // שמירה של המשתמש הנוכחי לכניסה אוטומטית
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // ניווט אוטומטי ל-Library
    navigate('/library');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        הרשמה
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
        <TextField
          label="אימות סיסמה"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleRegister}>
          הירשם
        </Button>
      </Stack>
    </Container>
  );
};

export default Register;