import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  Box,
  useTheme,
} from '@mui/material';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '98vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        background: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          background: theme.palette.primary.main,
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
          background: theme.palette.secondary.main,
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
            borderRadius: theme.shape.borderRadius,
            textAlign: 'center',
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(18px)',
            boxShadow: theme.shadows[20],
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 15px 35px ${theme.palette.primary.main}80`,
              transform: 'rotate(-5deg)',
            }}
          >
            <LibraryBooksRoundedIcon
              sx={{ fontSize: 52, color: theme.palette.common.white }}
            />
          </Box>

          {/* Title */}
          <Typography
            component="h3"
            variant="h3"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
              letterSpacing: '-1px',
              fontWeight: 800,
            }}
          >
            ספריה שיתופית
          </Typography>

          {/* Subtitle */}
          <Typography
            component="p"
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
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
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                px: 5,
                py: 1.6,
                borderRadius: theme.shape.borderRadius,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
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
                borderRadius: theme.shape.borderRadius,
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
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