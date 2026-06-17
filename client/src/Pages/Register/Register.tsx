import React, { createContext, useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  List,
  ListItemButton,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useDebounce } from "../../api";
import MiniMap from "./MiniMap";
import { registerUser } from "../UserSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";

/* ---------- TYPES ---------- */
interface Place {
  display_name: string;
  lat: string;
  lon: string;
}



/* ---------- reverse geocode ---------- */
const reverseGeocode = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  return await res.json();
};

const Register = () => {
  
const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [address, setAddress] = useState({
    city: "",
    street: "",
    houseNumber: "",
  });

  const [coords, setCoords] = useState({
    lat: 32.0853,
    lng: 34.7818,
  });

  const [results, setResults] = useState<Place[]>([]);
  const query = useDebounce(
    `${address.city} ${address.street} ${address.houseNumber}`,
    300
  );

  useEffect(() => {
    const load = async () => {
      if (query.trim().length < 3) return;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${query}`
      );

      const data = await res.json();
      setResults(data);
    };

    load();
  }, [query]);

const handleSelect = async (place: Place) => {
  setCoords({
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
  });

  const data = await reverseGeocode(
    parseFloat(place.lat),
    parseFloat(place.lon)
  );

  const a = data.address;

  setAddress({
    city: a.city || a.town || a.village || "",
    street: a.road || "",
    houseNumber: a.house_number || "",
  });

  setResults([]);
};

  const handleMapClick = async (lat: number, lng: number) => {
    setCoords({ lat, lng });

    const data = await reverseGeocode(lat, lng);

    const a = data.address;

    setAddress({
      city: a.city || a.town || a.village || "",
      street: a.road || "",
      houseNumber: a.house_number || "",
    });
  };

  const handleFormChange = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const handleAddressChange = (key: string, value: string) => {
    setAddress((p) => ({ ...p, [key]: value }));
  };

const handleSubmit = async () => {
  const payload = {
    name: form.name,
    email: form.email,
    password: form.password,
    latitude: coords.lat,
    longitude: coords.lng,
  };

  console.log("REGISTER PAYLOAD:", payload);

  try {
    await dispatch(registerUser(payload)).unwrap();
    console.log("נרשם בהצלחה");
  } catch (err) {
    console.error("שגיאת הרשמה:", err);
  }
};

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4">הרשמה</Typography>

      <Stack spacing={2}>
        <TextField
          label="שם"
          value={form.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />

        <TextField
          label="אימייל"
          value={form.email}
          onChange={(e) => handleFormChange("email", e.target.value)}
        />

        <TextField
          label="סיסמה"
          type="password"
          value={form.password}
          onChange={(e) => handleFormChange("password", e.target.value)}
        />

        <TextField
          label="עיר"
          value={address.city}
          onChange={(e) => handleAddressChange("city", e.target.value)}
        />

        <TextField
          label="רחוב"
          value={address.street}
          onChange={(e) => handleAddressChange("street", e.target.value)}
        />

        <TextField
          label="מספר בית"
          value={address.houseNumber}
          onChange={(e) =>
            handleAddressChange("houseNumber", e.target.value)
          }
        />

        {results.length > 0 && (
          <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
            <List>
              {results.map((p, i) => (
                <ListItemButton key={i} onClick={() => handleSelect(p)}>
                  {p.display_name}
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}

        <MiniMap
          lat={coords.lat}
          lng={coords.lng}
          onClick={handleMapClick}
        />

        <Button variant="contained" onClick={handleSubmit}>
          הירשם
        </Button>
      </Stack>
    </Container>
);
};

export default Register;