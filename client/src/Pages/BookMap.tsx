// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useLocation, useNavigate, useParams } from "react-router-dom";
// // import { AppDispatch, RootState } from "../app/store";
// // import { fetchNearbySessions } from "../slices/LendingsSlice";
// // import BookRealMap from "../Pages/BookRealMap";
// // import { Button, Container, Stack, Typography } from "@mui/material";

// // const BookMap = () => {
// //   const { id } = useParams();
// //   const dispatch = useDispatch<AppDispatch>();
// //   const navigate = useNavigate();

// //   const location = useLocation();
// //   const book = location.state?.book;

// //   const user = useSelector((s: RootState) => s.myUser.currentUser);
// //   const { items } = useSelector((s: RootState) => s.lendings);

// //   useEffect(() => {
// //     if (!id || !user) return;

// //     dispatch(
// //       fetchNearbySessions({
// //         bookId: id,
// //         userLat: user.latitude,
// //         userLng: user.longitude,
// //       })
// //     );
// //   }, [id, user, dispatch]);

// //   if (!user) return null;

// //   const top3 = items?.length
// //     ? [...items]
// //         .sort((a, b) => a.distanceKm - b.distanceKm)
// //         .slice(0, 3)
// //     : [];

// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       <Typography variant="h5">בחר עותק קרוב</Typography>

// //       <Typography sx={{ mb: 2 }}>
// //         {book?.name ?? "ספר לא זמין"}
// //       </Typography>

// //       {/* MAP */}
// //       {top3.length > 0 && (
// //         <BookRealMap
// //           user={{
// //             lat: user.latitude,
// //             lng: user.longitude,
// //           }}
// //           points={top3
// //             .filter((x) => x.lat && x.lng)
// //             .map((x) => ({
// //               id: x.bookSessionId,
// //               name: x.collaboratorName,
// //               lat: x.lat,
// //               lng: x.lng,
// //             }))}
// //         />
// //       )}

// //       {/* OPTIONS */}
// //       <Stack spacing={2} sx={{ mt: 3 }}>
// //         {top3.map((copy) => (
// //           <Button
// //             key={copy.bookSessionId}
// //             variant="outlined"
// //             onClick={() =>
// //               navigate(`/borrow/${copy.bookSessionId}`, {
// //                 state: { session: copy, book },
// //               })
// //             }
// //           >
// //             {copy.collaboratorName} - {copy.distanceKm.toFixed(2)} ק״מ
// //           </Button>
// //         ))}
// //       </Stack>
// //     </Container>
// //   );
// // };

// // export default BookMap;
// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { AppDispatch, RootState } from "../app/store";
// import { fetchNearbySessions } from "../slices/LendingsSlice";
// import BookRealMap from "../Pages/BookRealMap";
// import { Button, Container, Stack, Typography } from "@mui/material";

// const BookMap = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const location = useLocation();
//   const book = location.state?.book;

//   const user = useSelector((s: RootState) => s.myUser.currentUser);
//   const { items } = useSelector((s: RootState) => s.lendings);

//   // 🔒 Guard - אין משתמש עדיין
//   const hasUserLocation =
//     !!user?.latitude && !!user?.longitude;

//   useEffect(() => {
//     if (!id || !hasUserLocation) return;

//     dispatch(
//       fetchNearbySessions({
//         bookId: id,
//         userLat: user.latitude,
//         userLng: user.longitude,
//       })
//     );
//   }, [id, hasUserLocation, user, dispatch]);

//   // 🧠 memo למניעת חישוב מחדש בכל render
//   const top3 = useMemo(() => {
//     if (!Array.isArray(items)) return [];

//     return items
//       .filter((x) => x?.lat && x?.lng)
//       .sort((a, b) => a.distanceKm - b.distanceKm)
//       .slice(0, 3);
//   }, [items]);

//   if (!hasUserLocation) return null;

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h5">בחר עותק קרוב</Typography>

//       <Typography sx={{ mb: 2 }}>
//         {book?.name ?? "ספר לא זמין"}
//       </Typography>

//       {/* MAP */}
//       {top3.length > 0 && (
//         <BookRealMap
//           user={{
//             lat: user.latitude,
//             lng: user.longitude,
//           }}
//           points={top3.map((x) => ({
//             id: x.bookSessionId,
//             name: x.collaboratorName ?? "לא ידוע",
//             lat: x.lat,
//             lng: x.lng,
//           }))}
//         />
//       )}

//       {/* OPTIONS */}
//       <Stack spacing={2} sx={{ mt: 3 }}>
//         {top3.map((copy) => (
//           <Button
//             key={copy.bookSessionId}
//             variant="outlined"
//             onClick={() =>
//               navigate(`/borrow/${copy.bookSessionId}`, {
//                 state: { session: copy, book },
//               })
//             }
//           >
//             {copy.collaboratorName ?? "לא ידוע"} -{" "}
//             {copy.distanceKm?.toFixed(2) ?? "?"} ק״מ
//           </Button>
//         ))}
//       </Stack>
//     </Container>
//   );
// };

// export default BookMap;
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { fetchNearbySessions } from "../slices/LendingsSlice";
import BookRealMap from "../Pages/BookRealMap";
import { Button, Container, Stack, Typography } from "@mui/material";

const BookMap = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const location = useLocation();
  const book = location.state?.book;

  const user = useSelector((s: RootState) => s.myUser.currentUser);
  const { items } = useSelector((s: RootState) => s.lendings);

  const hasUserLocation =
    !!user?.latitude && !!user?.longitude;

  useEffect(() => {
    if (!id || !hasUserLocation) return;

    dispatch(
      fetchNearbySessions({
        bookId: id,
        userLat: user.latitude,
        userLng: user.longitude,
      })
    );
  }, [id, hasUserLocation, user, dispatch]);

  const top3 = useMemo(() => {
    if (!Array.isArray(items)) return [];

    return items
      .filter((x) => x?.lat && x?.lng)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 3);
  }, [items]);

  if (!hasUserLocation) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">בחר עותק קרוב</Typography>

      <Typography sx={{ mb: 2 }}>
        {book?.name ?? "ספר לא זמין"}
      </Typography>

      <BookRealMap
        user={{
          lat: user.latitude,
          lng: user.longitude,
        }}
        points={top3.map((x) => ({
          id: x.bookSessionId,
          name: x.collaboratorName ?? "לא ידוע",
          lat: x.lat,
          lng: x.lng,
        }))}
      />

      <Stack spacing={2} sx={{ mt: 3 }}>
        {top3.map((copy) => (
          <Button
            key={copy.bookSessionId}
            variant="outlined"
            onClick={() =>
              navigate(`/borrow/${copy.bookSessionId}`, {
                state: { session: copy, book },
              })
            }
          >
            {copy.collaboratorName} - {copy.distanceKm.toFixed(2)} ק״מ
          </Button>
        ))}
      </Stack>
    </Container>
  );
};

export default BookMap;