import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// RTL cache
export const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Theme
export const getTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  return createTheme({
    direction: 'rtl',

    palette: {
      mode,
      primary: { main: '#2563eb' },
      secondary: { main: '#7c3aed' },

      background: {
        default: isDark ? '#0f172a' : '#f3f4f6',
        paper: isDark ? '#1e293b' : '#ffffff',
      },

      text: {
        primary: isDark ? '#f9fafb' : '#111827',
        secondary: isDark ? '#cbd5f5' : '#6b7280',
      },

      divider: isDark
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.12)',
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: 'Arial, sans-serif',
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            direction: 'rtl',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: isDark
              ? '0 10px 30px rgba(0,0,0,0.4)'
              : '0 5px 15px rgba(0,0,0,0.1)',
          }),
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              '& fieldset': {
                borderColor: theme.palette.divider,
              },
              '&:hover fieldset': {
                borderColor: theme.palette.text.secondary,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.text.secondary,
            },
            '& .MuiOutlinedInput-input': {
              textAlign: 'right',
            },
          }),
        },
      },

      MuiButton: {
        styleOverrides: {
          contained: ({ theme }) => ({
            color: '#fff',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
      },
    },
  });
};