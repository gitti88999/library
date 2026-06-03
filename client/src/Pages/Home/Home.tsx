import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Box,
} from '@mui/material';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        px: 2,
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: '#2563eb',
          borderRadius: '50%',
          filter: 'blur(140px)',
          top: -100,
          left: -100,
          opacity: 0.3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 350,
          height: 350,
          background: '#7c3aed',
          borderRadius: '50%',
          filter: 'blur(140px)',
          bottom: -120,
          right: -80,
          opacity: 0.3,
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              width: 100,
              height: 100,
              mx: 'auto',
              mb: 4,
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              boxShadow: '0 15px 35px rgba(37,99,235,0.45)',
              transform: 'rotate(-5deg)',
            }}
          >
            <LibraryBooksRoundedIcon
              sx={{
                fontSize: 52,
                color: '#fff',
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            component="h3"
            variant="h3"
            gutterBottom
            sx={{
              color: '#fff',
              letterSpacing: '-1px',
              fontWeight: 800, // ✅ fontWeight בתוך sx
            }}
          >
            ספריה שיתופית
          </Typography>

          {/* Subtitle */}
          <Typography
            component="p"
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.72)',
              mb: 5,
              lineHeight: 1.9,
              fontSize: '1.05rem',
              fontWeight: 400,
            }}
          >
            פלטפורמה מודרנית לניהול, שיתוף והשאלת ספרים בצורה חכמה ונוחה.
          </Typography>

          {/* Buttons */}
          <Stack
  component="div"
  direction={{ xs: 'column', sm: 'row' }}
  spacing={2}
  sx={{
    justifyContent: 'center',
  }}
>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                px: 5,
                py: 1.6,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                background:
                  'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                boxShadow: '0 10px 25px rgba(37,99,235,0.35)',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 16px 35px rgba(37,99,235,0.45)',
                  background:
                    'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                },
              }}
            >
              הרשמה
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                px: 5,
                py: 1.6,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.25)',
                borderWidth: 2,
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: '#fff',
                  background: 'rgba(255,255,255,0.06)',
                },
              }}
            >
              כניסה
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;