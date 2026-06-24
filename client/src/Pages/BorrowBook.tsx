
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { fetchNearbySessions, requestBorrow } from "../slices/LendingsSlice";

import {
Container,
Typography,
Card,
CardContent,
Button,
Stack,
CircularProgress,
} from "@mui/material";

const BorrowBook = () => {
const { id } = useParams();
const dispatch = useDispatch<AppDispatch>();

const { items, status, error } = useSelector(
(state: RootState) => state.lendings
);

const [selected, setSelected] = useState<string | null>(null);
const user = useSelector((state: RootState) => state.myUser.currentUser);
const B = useSelector((state: RootState) => state.lendings);

if (!user) return;
const userLocation = {
lat: user.latitude,
lng: user.longitude,
};
const book = useSelector((state: RootState) =>
state.myBooks.items.find(b => b.book?.id === id)
);
console.log("book",book)

const handleSelect = async (bookSessionId: string) => {
setSelected(bookSessionId);

try {
  console.log(B)
  const owner = B.items.find(x => x.bookSessionId === bookSessionId);
  await dispatch(
    requestBorrow({
      bookSessionId,
      AName: user.name,
      AEmail: user.email,
      BName: owner?.collaboratorName ?? "unknown",
      BEmail: owner?.collaboratorEmail ?? "unknown",
    })
  ).unwrap();

  console.log("בקשה נשלחה בהצלחה");
} catch (err) {
  console.error("שגיאה בשליחת בקשה", err);
}
};
useEffect(() => {
if (!id) return;
dispatch(
fetchNearbySessions({
bookId: id,
userLat: userLocation.lat,
userLng: userLocation.lng,
})
);
}, [id, dispatch]);

return (
<Container sx={{ mt: 8 }}>

בחירת עותק לספר

  <Typography sx={{ mb: 2 }}>
    ספר נבחר: {book?.book?.name}
  </Typography>

  {status === "loading" && <CircularProgress />}


  <Stack spacing={2}>
    {items.map((copy) => (
      <Card key={copy.bookSessionId}>
        <CardContent>
          <Typography>
            בעלים: {copy.collaboratorName}
          </Typography>

          <Typography color="text.secondary">
            מרחק: {copy.distanceKm.toFixed(2)} ק״מ
          </Typography>

          <Button
            variant={selected === copy.bookSessionId ? "contained" : "outlined"}
            onClick={() => handleSelect(copy.bookSessionId)}
          >
            {selected === copy.bookSessionId ? "נבחר ונשלח" : "בחר עותק"}
          </Button>
        </CardContent>
      </Card>
    ))}
  </Stack>
</Container>
);
};

export default BorrowBook;