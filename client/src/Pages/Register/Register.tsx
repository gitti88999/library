import React, { useEffect, useState } from "react";
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
import { searchAddress } from "../UserSlice";
import MiniMap from "./MiniMap";

interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    street: "",
    houseNumber: "",
  });
  const [results, setResults] = useState<Place[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  const addressQuery = useDebounce(
    `${form.street} ${form.houseNumber} ${form.city}`,
    400
  );
const lat = selected ? parseFloat(selected.lat) : 32.0853;
const lng = selected ? parseFloat(selected.lon) : 34.7818;
  useEffect(() => {
    const load = async () => {
      if (addressQuery.trim().length < 5) return;

      const data = await searchAddress(addressQuery);
      setResults(data);
    };

    load();
  }, [addressQuery]);

  const handleSelect = (place: Place) => {
    setSelected(place);
    setResults([]);
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!selected) {
      alert("יש לבחור כתובת מהרשימה");
      return;
    }

    const payload = {
      ...form,
      latitude: parseFloat(selected.lat),
      longitude: parseFloat(selected.lon),
    };

    console.log("REGISTER PAYLOAD:", payload);

    // כאן אתה עושה dispatch(registerUser(payload))
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        הרשמה
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="שם"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="אימייל"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <TextField
          label="סיסמה"
          type="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <TextField
          label="עיר"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />

        <TextField
          label="רחוב"
          value={form.street}
          onChange={(e) => handleChange("street", e.target.value)}
        />

        <TextField
          label="מספר בית"
          value={form.houseNumber}
          onChange={(e) => handleChange("houseNumber", e.target.value)}
        />

        {/* AUTOCOMPLETE RESULTS */}
        {results.length > 0 && (
          <Paper sx={{ maxHeight: 200, overflow: "auto" }}>
            <List>
              {results.map((place, i) => (
                <ListItemButton
                  key={i}
                  onClick={() => handleSelect(place)}
                >
                  {place.display_name}
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
        {selected && (
          <div style={{ marginTop: 10 }}>
            <MiniMap lat={lat} lng={lng} />
          </div>
        )}
        <Button variant="contained" onClick={handleSubmit}>
          הירשם
        </Button>
      </Stack>
    </Container>
  );
};

export default Register;