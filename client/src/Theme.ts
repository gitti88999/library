import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#2563eb',
    },

    secondary: {
      main: '#7c3aed',
    },

    background: {
      default: '#0f172a',
      paper: 'rgba(15, 23, 42, 0.75)',
    },

    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: '-1px',
    },
    h4: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          backgroundImage: 'none',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255,255,255,0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255,255,255,0.35)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255,255,255,0.7)',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 700,
          textTransform: 'none',
        },

        contained: {
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          boxShadow: '0 10px 25px rgba(37,99,235,0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
            boxShadow: '0 16px 35px rgba(37,99,235,0.45)',
          },
        },
      },
    },
  },
});

export default theme;