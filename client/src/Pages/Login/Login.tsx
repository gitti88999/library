import React, { useState } from "react";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setSuccess("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

      const response = await axios.post(
        `${apiUrl}/api/Auth/login`,
        {
          name: formData.name,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data)
      );

      setSuccess("התחברת בהצלחה");

      setTimeout(() => {
        navigate("/library");
      }, 1000);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("שם משתמש או סיסמה שגויים");
      } else {
        setError("אירעה שגיאה בהתחברות");
      }

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
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          background: "#2563eb",
          borderRadius: "50%",
          filter: "blur(140px)",
          top: -120,
          left: -120,
          opacity: 0.25,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 380,
          height: 380,
          background: "#7c3aed",
          borderRadius: "50%",
          filter: "blur(140px)",
          bottom: -120,
          right: -100,
          opacity: 0.25,
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 6,
            textAlign: "center",
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: 800,
              mb: 4,
            }}
          >
            כניסה למערכת
          </Typography>

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              {error && (
                <Alert severity="error">
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success">
                  {success}
                </Alert>
              )}

              <TextField
                label="שם משתמש"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="סיסמה"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.6,
                  borderRadius: 4,
                  fontWeight: 700,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "התחבר"
                )}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;