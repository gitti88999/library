import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./LoginSlice";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";

const apiUrl = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response = await axios.post(`${apiUrl}/api/Auth/login`, formData);

      dispatch(setUser(response.data)); // שמירה ב-Redux + localStorage
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
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, borderRadius: 4, background: "rgba(15,23,42,0.85)", color: "#fff" }}>
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 3 }}>כניסה למערכת</Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}

              <TextField label="שם משתמש" name="name" value={formData.name} onChange={handleChange} fullWidth slotProps={{
                  inputLabel: { shrink: true }
                }} />
              <TextField label="סיסמה" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth slotProps={{
                  inputLabel: { shrink: true }
                }} />

              <Button type="submit" variant="contained" disabled={loading} sx={{ py: 1.5, fontWeight: "bold", background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>
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