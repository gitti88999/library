import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { useState } from "react";
// import { searchBookSessions } from "./SearchSlice";
/* ---------- חישוב מרחק (Haversine) ---------- */
const getDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/* ---------- TYPES ---------- */
type Copy = {
  id: number;
  lat: number;
  lng: number;
};

const BorrowBook = () => {
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedCopy, setSelectedCopy] = useState<number | null>(null);

  /* ---------- USER LOCATION (צריך להגיע מ־Redux / backend) ---------- */
  const userLocation = {
    lat: 32.0853,
    lng: 34.7818,
  };

  /* ---------- MOCK COPIES (בפועל יבוא מהשרת) ---------- */
  const copies: Copy[] = [
    { id: 1, lat: 32.1, lng: 34.8 },
    { id: 2, lat: 31.9, lng: 34.7 },
    { id: 3, lat: 32.3, lng: 34.6 },
  ];

  const handleSelectCopy = (copyId: number) => {
    setSelectedCopy(copyId);
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        בחירת עותק לספר
      </Typography>

      <Typography sx={{ mb: 3 }}>
        ספר נבחר: {id}
      </Typography>

      <Stack spacing={2}>
        {copies.map((copy) => {
          const distance = getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            copy.lat,
            copy.lng
          );

          return (
            <Card key={copy.id}>
              <CardContent>
                <Typography>עותק #{copy.id}</Typography>

                <Typography color="text.secondary">
                  מרחק: {distance.toFixed(2)} ק״מ
                </Typography>

                <Button
                  variant={selectedCopy === copy.id ? "contained" : "outlined"}
                  color={selectedCopy === copy.id ? "success" : "primary"}
                  sx={{ mt: 1 }}
                  onClick={() => handleSelectCopy(copy.id)}
                >
                  {selectedCopy === copy.id ? "נבחר" : "בחר עותק"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <Button sx={{ mt: 3 }} onClick={() => navigate(-1)}>
        חזור
      </Button>
    </Container>
  );
};

export default BorrowBook;
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../app/store";

// import { fetchBookSessionsByBookId } from "../../Pages/BorrowBook/BorrowBookSlice";

// const BorrowBook: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { bookId } = useParams<{ bookId: string }>();

//   const { sessions, status } = useSelector(
//     (state: RootState) => state.borrowBook
//   );

//   useEffect(() => {
//     console.log("bookId param:", bookId);

//     if (!bookId) return;

//     dispatch(fetchBookSessionsByBookId(bookId));
//   }, [bookId, dispatch]);

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Borrow Book</h2>

//       {sessions.length === 0 ? (
//         <p>No sessions found</p>
//       ) : (
//         sessions.map((item: any) => (
//           <div
//             key={item.bookSessionId}
//             style={{
//               border: "1px solid gray",
//               margin: 10,
//               padding: 10,
//             }}
//           >
//             <h3>{item.book?.name}</h3>
//             <p>Enabled: {item.enabled ? "Yes" : "No"}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default BorrowBook;