import { useEffect, useState } from "react";
import { Card, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import BookRealMap from "./BookRealMap";
import { fetchNearbySessions } from "../slices/LendingsSlice";

const BookMap = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;
  const user = useSelector((state: RootState) => state.myUser.currentUser);
  const { items } = useSelector((state: RootState) => state.lendings);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !user) return;

    dispatch(
      fetchNearbySessions({
        bookId: id,
        userLat: user.latitude,
        userLng: user.longitude,
      })
    );
  }, [id, user, dispatch]);

  if (!user) return null;

  const top3 = items?.length
    ? [...items].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3)
    : [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">בחר עותק קרוב</Typography>
      <Typography sx={{ mb: 2 }}>{book?.name ?? "ספר לא זמין"}</Typography>

      <BookRealMap
        user={{ lat: user.latitude, lng: user.longitude }}
        points={top3.map((session) => ({
          id: session.bookSessionId,
          name: session.collaboratorName,
          lat: session.lat,
          lng: session.lng,
        }))}
        activeId={activeId}
        setActiveId={setActiveId}
      />

      <Stack spacing={2} sx={{ mt: 3 }}>
        {top3.map((session) => (
          <Card
            key={session.bookSessionId}
            onMouseEnter={() => setActiveId(session.bookSessionId)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() =>
              navigate(`/borrow/${session.bookSessionId}`, {
                state: { session, book },
              })
            }
            sx={{
              p: 2,
              cursor: "pointer",
              border:
                activeId === session.bookSessionId
                  ? "2px solid #2563eb"
                  : "1px solid #ddd",
              transition: "all 0.2s ease-in-out",
              transform:
                activeId === session.bookSessionId ? "scale(1.02)" : "scale(1)",
              userSelect: "none",
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>
              {session.collaboratorName ?? "לא ידוע"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {session.distanceKm != null
                ? `${session.distanceKm.toFixed(2)} ק״מ`
                : "מרחק לא ידוע"}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default BookMap;
