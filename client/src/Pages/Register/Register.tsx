import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../UserSlice";
import type { RootState as ReduxRootState } from "../../app/store";
import {
  Container,
  Paper,
  Stack,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "300px",
};

const DEFAULT_CENTER = { lat: 32.0853, lng: 34.7818 };
const Register: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch<any>();
  const userState = useSelector((state: ReduxRootState) => state.myUser);
const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    latitude: DEFAULT_CENTER.lat,
    longitude: DEFAULT_CENTER.lng,
  });

  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setLocationFetched(true);
      },
      (error) => console.error(error),
      { timeout: 30000 }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "latitude" || name === "longitude" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser =await dispatch(addUser(formData)).unwrap();
      setSuccess("נרשמת בהצלחה");
      console.log("newUser.collaboratorId",newUser.collaboratorId);
      console.log("newUser.name",newUser.name);

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.background.default,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            borderRadius: theme.shape.borderRadius,
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            backdropFilter: "blur(18px)",
            boxShadow: theme.shadows[20],
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            הרשמה
          </Typography>

          {userState.status === "loading" && <p>Registering user...</p>}
          {userState.status === "failed" && (
            <p style={{ color: theme.palette.error.main }}>{userState.error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="שם משתמש"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />

              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={MAP_CONTAINER_STYLE}
                  center={{ lat: formData.latitude, lng: formData.longitude }}
                  zoom={12}
                >
                  <Marker position={{ lat: formData.latitude, lng: formData.longitude }} />
                </GoogleMap>
              </LoadScript>

              <TextField
                label="Latitude"
                name="latitude"
                type="number"
                value={formData.latitude}
                fullWidth
              />
              <TextField
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
                fullWidth
              />

              <Button
                variant="contained"
                type="submit"
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                הירשם
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;