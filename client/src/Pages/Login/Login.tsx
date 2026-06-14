// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// // import { setUser } from "./LoginSlice";
// import {loginUser } from"../UserSlice"
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Alert,
//   CircularProgress,
//   useTheme,
// } from "@mui/material";

// const apiUrl = import.meta.env.VITE_API_URL;

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const [formData, setFormData] = useState({ name: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setError("");
//     setSuccess("");
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!formData.name.trim() || !formData.password.trim()) {
//       setError("יש למלא את כל השדות");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(`${apiUrl}/api/Auth/login`, formData);

//       // dispatch(setUser(response.data));
//       dispatch(
//       setUser({
//         id: response.data.collaboratorId, // ממפה ל-id
//     name: response.data.name,
//     email: response.data.email,
//     books: response.data.bookSessions || [],
//     token: response.data.token,
//       })
//     );

//       setSuccess("התחברת בהצלחה");

//       setTimeout(() => navigate("/library"), 500);
//     } catch (err: any) {
//       setError(
//         err.response?.status === 401
//           ? "שם משתמש או סיסמה שגויים"
//           : "שגיאה בהתחברות"
//       );
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: theme.palette.background.default,
//       }}
//     >
//       <Container maxWidth="sm">
//         <Paper
//           sx={{
//             p: 5,
//             borderRadius: theme.shape.borderRadius,
//             backgroundColor: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//             boxShadow: theme.shadows[20],
//           }}
//         >
//           <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
//             כניסה למערכת
//           </Typography>

//           <form onSubmit={handleLogin}>
//             <Stack spacing={2}>
//               {error && <Alert severity="error">{error}</Alert>}
//               {success && <Alert severity="success">{success}</Alert>}

//               <TextField
//                 label="שם משתמש"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 fullWidth
//               />
//               <TextField
//                 label="סיסמה"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 fullWidth
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   py: 1.5,
//                   fontWeight: "bold",
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   "&:hover": {
//                     background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                   },
//                 }}
//               >
//                 {loading ? <CircularProgress size={22} color="inherit" /> : "התחבר"}
//               </Button>
//             </Stack>
//           </form>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography, TextField, Button, Stack, Alert, CircularProgress, useTheme } from "@mui/material";
import { loginUser } from "../UserSlice"; // זה ה-asyncThunk מה-userSlice
import type { AppDispatch } from "../../app/store";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();

  const [formData, setFormData] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.password.trim()) {
      setError("יש למלא את כל השדות");
      return;
    }

    try {
      setLoading(true);
      // dispatch ל-asyncThunk ומחזיר Promise עם unwrap()
      await dispatch(loginUser(formData)).unwrap();
      
      setSuccess("התחברת בהצלחה");
      setTimeout(() => navigate("/library"), 500);
    } catch (err: any) {
      setError(err.response?.status === 401 ? "שם משתמש או סיסמה שגויים" : "שגיאה בהתחברות");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[20],
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
            כניסה למערכת
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField
                label="שם משתמש"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="סיסמה"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "התחבר"}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;