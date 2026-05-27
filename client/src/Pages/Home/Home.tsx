import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Stack } from '@mui/material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        ספריה שיתופית
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'center', mt: 4, alignItems: 'center' }}
      >
        <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
          הרשמה
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/login')}>
          כניסה
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;