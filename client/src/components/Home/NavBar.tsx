import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  TextField,
  Box,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { AppDispatch, RootState } from "../../app/store";
import { reverseGeocode } from "../../services/geocode";
// import { updateUser, deleteUser } from "../../slices/UserSlice";
import { useDebounce } from "../../api";
import { updateUser } from "../../slices/UserSlice";

interface Props {
  isLoggedIn: boolean;
  toggleTheme: () => void;
  currentMode: "light" | "dark";
}

const Navbar: React.FC<Props> = ({
  isLoggedIn,
  toggleTheme,
  currentMode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.myUser.currentUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [editMode, setEditMode] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
  });

  const [address, setAddress] = useState({
    city: "",
    street: "",
    houseNumber: "",
  });

  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  const [results, setResults] = useState<any[]>([]);

  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const query = `${address.city} ${address.street} ${address.houseNumber}`;
  const debouncedQuery = useDebounce(query, 400);

  // OPEN PROFILE
  const handleOpen = async (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setEditMode(false);
    setResults([]);

    setEditData({
      name: user?.name || "",
      email: user?.email || "",
    });

    setCoords({
      lat: user?.latitude || 0,
      lng: user?.longitude || 0,
    });

    if (user?.latitude && user?.longitude) {
      const data = await reverseGeocode(user.latitude, user.longitude);
      const a = data.address;

      setAddress({
        city: a.city || a.town || a.village || "",
        street: a.road || "",
        houseNumber: a.house_number || "",
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditMode(false);
    setResults([]);
  };

  // SEARCH
  useEffect(() => {
    const load = async () => {
      if (!editMode) return;
      if (debouncedQuery.trim().length < 3) return;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${debouncedQuery}`
      );

      const data = await res.json();
      setResults(data);
    };

    load();
  }, [debouncedQuery, editMode]);

  const handleSelect = (place: any) => {
    const a = place.address || {};

    setCoords({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });

    setAddress({
      city: a.city || a.town || a.village || "",
      street: a.road || "",
      houseNumber: a.house_number || "",
    });

    setResults([]);
  };
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, []);
  const handleSave = async () => {
    const reverse = await reverseGeocode(coords.lat, coords.lng);
    if (user) {
      dispatch(
        updateUser({
          id: user.id, data: {
            Name: editData.name,
            Email: editData.email,
            Latitude: coords.lat,
            Longitude: coords.lng,
          }
        })
      );
    }
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteUser());
    handleClose();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex" }}>

          {/* NAV */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button component={Link} to="/" color="inherit">
              דף הבית
            </Button>

            {isLoggedIn && (
              <>
                <Button component={Link} to="/library" color="inherit">
                  הספרים שלי
                </Button>
                <Button component={Link} to="/search" color="inherit">
                  חיפוש
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* PROFILE */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoggedIn && user && (
              <>
                <IconButton onClick={handleOpen}>
                  <Avatar>{user.name?.charAt(0)}</Avatar>
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <Box sx={{ p: 2, width: 320, textAlign: "right" }} dir="rtl">

                    {!editMode && (
                      <>
                        <Typography>שם: {user.name}</Typography>
                        <Typography>אימייל: {user.email}</Typography>

                        <Typography>
                          כתובת: {address.city || address.street || address.houseNumber
                            ? `${address.street} ${address.houseNumber}, ${address.city}`
                            : "לא זמינה"}
                        </Typography>

                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => setEditMode(true)}
                        >
                          עריכה
                        </Button>
                        <Button
                          fullWidth
                          color="error"
                          onClick={() => setConfirmDeleteOpen(true)}
                          sx={{ mt: 1 }}
                        >
                          מחיקה
                        </Button>
                      </>
                    )}

                    {editMode && (
                      <>
                        <TextField
                          fullWidth
                          label="שם"
                          value={editData.name}
                          onChange={(e) =>
                            setEditData({ ...editData, name: e.target.value })
                          }
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="אימייל"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="עיר"
                          value={address.city}
                          onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                          }
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="רחוב"
                          value={address.street}
                          onChange={(e) =>
                            setAddress({ ...address, street: e.target.value })
                          }
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="מספר בית"
                          value={address.houseNumber}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              houseNumber: e.target.value,
                            })
                          }
                          sx={{ mb: 2 }}
                        />

                        {/* RESULTS */}
                        {results.length > 0 && (
                          <Box sx={{ maxHeight: 200, overflow: "auto", mb: 2 }}>
                            {results.map((r, i) => (
                              <Button
                                key={i}
                                fullWidth
                                onClick={() => handleSelect(r)}
                                sx={{ justifyContent: "flex-end" }}
                              >
                                {r.display_name}
                              </Button>
                            ))}
                          </Box>
                        )}

                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => setConfirmUpdateOpen(true)}
                        >
                          שמירה
                        </Button>


                      </>
                    )}
                  </Box>
                </Menu>
              </>
            )}

            {/* THEME */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {currentMode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* UPDATE CONFIRM (FIXED - closes properly) */}
      <Dialog
        open={confirmUpdateOpen}
        onClose={() => setConfirmUpdateOpen(false)}
      >
        <DialogTitle>?לאשר שמירה</DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setConfirmUpdateOpen(false); // 🔥 סגירה מיידית
              handleSave();
            }}
          >
            אישור
          </Button>
          <Button onClick={() => setConfirmUpdateOpen(false)}>
            ביטול
          </Button>


        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRM */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>?למחוק משתמש</DialogTitle>

        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setConfirmDeleteOpen(false);
              handleDelete();
            }}
          >
            מחיקה
          </Button>
          <Button onClick={() => setConfirmDeleteOpen(false)}>
            ביטול
          </Button>


        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;