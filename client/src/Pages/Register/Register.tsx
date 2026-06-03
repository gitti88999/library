import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./RegisterSlice";
import type { RootState as ReduxRootState } from "../../app/store";
import {
  Container,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "300px",
};

const DEFAULT_CENTER = { lat: 32.0853, lng: 34.7818 }; // תל אביב ברירת מחדל

const Register: React.FC = () => {
  const dispatch = useDispatch<any>();
  const userState = useSelector((state: ReduxRootState) => state.myUser);

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
      (error) => {
        console.error("Geolocation error:", error);
        console.error("Code:", error.code);
  console.error("Message:", error.message);
      },
      { timeout: 30000 }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "latitude" || name === "longitude" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addUser(formData)).unwrap();
      console.log("User registered successfully!");
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
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 4,
            borderRadius: 6,
            textAlign: "center",
            background: "rgba(15,23,42,0.75)",
          }}
        >
          <Typography variant="h3" sx={{ color: "#fff", mb: 3 }}>
            הרשמה
          </Typography>

          {userState.status === "loading" && <p>Registering user...</p>}
          {userState.status === "failed" && (
            <p style={{ color: "red" }}>{userState.error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="שם משתמש"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
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
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
              <TextField
                label="Longitude"
                name="longitude"
                type="number"
                value={formData.longitude}
                fullWidth
                variant="outlined"
                InputProps={{ readOnly: true }}
              />

              <Button variant="contained" type="submit">
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