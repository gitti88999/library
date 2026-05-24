import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // צבע ראשי (כחול)
    },
    secondary: {
      main: '#f50057', // צבע משני (ורוד/סגול)
    },
    background: {
      default: '#f5f5f5', // רקע כללי של האתר
      paper: '#ffffff',   // רקע כרטיסים/פייפר
    },
    text: {
      primary: '#333333', // צבע טקסט עיקרי
      secondary: '#555555', // צבע טקסט משני
    },
  },
});

export default theme;