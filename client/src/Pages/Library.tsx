
import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { getMyBooks, addBook } from "../slices/LibrarySlice";
import { BookDTO } from "../types/book";

import { getAudiences } from "../slices/AudienceSlice";
import { getAuthors } from "../slices/AuthorSlice";
import { getCategories } from "../slices/CategorySlice";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(
    (state: RootState) => state.myUser.currentUser
  );

  const items = useSelector((state: RootState) => state.myBooks.items);
  const status = useSelector((state: RootState) => state.myBooks.status);
  const error = useSelector((state: RootState) => state.myBooks.error);

  const audiences = useSelector((state: RootState) => state.audiences.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const authors = useSelector((state: RootState) => state.authors.items);
  const [message, setMessage] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [pendingSessionId, setPendingSessionId] = useState<string | undefined>();

  const [book, setBook] = useState({
    id: "",
    name: "",
    categoryId: "",
    audienceId: "",
    authorId: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAudiences());
    dispatch(getAuthors());
    dispatch(getCategories());

    if (currentUser?.id) {
      dispatch(getMyBooks());
    }
  }, [dispatch, currentUser?.id]);

  const categoryMap = useMemo(() => {
    const m: Record<string, string> = {};
    categories.forEach((c: any) => (m[c.id] = c.name));
    return m;
  }, [categories]);

  const authorMap = useMemo(() => {
    const m: Record<string, string> = {};
    authors.forEach((a: any) => (m[a.id] = a.name));
    return m;
  }, [authors]);

  const audienceMap = useMemo(() => {
    const m: Record<string, string> = {};
    audiences.forEach((a: any) => (m[a.id] = a.name));
    return m;
  }, [audiences]);

  const handleAdd = async () => {
    if (!currentUser?.id) return;

    try {
      await dispatch(
        addBook({
          ...book,
          collaboratorId: currentUser.id,
        })
      ).unwrap();

      setSuccessMsg("הספר נוסף בהצלחה");
      setErrorMsg(null);

      setBook({
        id: "",
        name: "",
        categoryId: "",
        audienceId: "",
        authorId: "",
      });

      setAddOpen(false);
      dispatch(getMyBooks());
    } catch (err: any) {
      setErrorMsg(err?.message || "שגיאה בהוספת הספר");
      setSuccessMsg(null);
    }
  };

  const handleDelete = (sessionId?: string) => {
    if (!sessionId) return;
    setPendingSessionId(sessionId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingSessionId) return;

    try {
      await axios.put(
        `${apiUrl}/api/BookSession/${pendingSessionId}/archiveAndDelete`
      );

      dispatch(getMyBooks());
    // await dispatch(getMyBooks()).unwrap();

    } catch {
      setErrorMsg("שגיאה במחיקה");
    } finally {
      setDeleteOpen(false);
      setPendingSessionId(undefined);
    }
  };


  const handleCancelDelete = () => {
    setDeleteOpen(false);
    setPendingSessionId(undefined);
  };

  if (!currentUser) return <div>יש להתחבר למערכת</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4">הספרים שלי</Typography>

      <Button sx={{ mt: 2 }} variant="contained" onClick={() => setAddOpen(true)}>
        הוספת ספר
      </Button>

     
      {error && <Typography color="error">{error}</Typography>}
      {errorMsg && <Typography color="error">{errorMsg}</Typography>}
      {successMsg && <Typography color="primary">{successMsg}</Typography>}


      {status === "loading" && <Typography>טוען...</Typography>}

      <Stack spacing={2} sx={{ mt: 3 }}>
        {!items.length && status !== "loading" ? (
          <Typography>אין ספרים עדיין</Typography>
        ) : (
          items.map((item: any) => {
            const sessionId = item?.id || item?.bookSessionId;
            const book = item?.book;

            return (
              <Card key={sessionId}>
                <CardContent>
                  <Typography variant="h6">{book?.name}</Typography>

                  <Typography>
                    מחבר: {authorMap[book?.authorId]}
                  </Typography>

                  <Typography>
                    קטגוריה: {categoryMap[book?.categoryId]} | קהל יעד:{" "}
                    {audienceMap[book?.audienceId]}
                  </Typography>

                  <Button color="error" onClick={() => handleDelete(sessionId)}>
                    <DeleteForeverIcon />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>

      {/* ADD */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>הוספת ספר</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="שם הספר"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
            sx={{ mt: 2 }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={book.categoryId}
              onChange={(e) =>
                setBook({ ...book, categoryId: String(e.target.value) })
              }
            >
              {categories.map((c: any) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>קהל יעד</InputLabel>
            <Select
              value={book.audienceId}
              onChange={(e) =>
                setBook({ ...book, audienceId: String(e.target.value) })
              }
            >
              {audiences.map((a: any) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>מחבר</InputLabel>
            <Select
              value={book.authorId}
              onChange={(e) =>
                setBook({ ...book, authorId: String(e.target.value) })
              }
            >
              {authors.map((a: any) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleAdd}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE */}
      <Dialog open={deleteOpen} onClose={handleCancelDelete}>
        <DialogTitle>אישור מחיקה</DialogTitle>
        <DialogContent>האם אתה בטוח?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>ביטול</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            מחיקה
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Library;
// import { useEffect, useState, useMemo } from "react";
// import {
//   Container,
//   Typography,
//   Stack,
//   Card,
//   CardContent,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Box,
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../app/store";

// import { getMyBooks, addBook } from "../slices/LibrarySlice";
// import { getAudiences } from "../slices/AudienceSlice";
// import { getAuthors } from "../slices/AuthorSlice";
// import { getCategories } from "../slices/CategorySlice";

// import axios from "axios";

// import "./Library.css";

// const apiUrl = import.meta.env.VITE_API_URL;

// const Library: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const currentUser = useSelector(
//     (state: RootState) => state.myUser.currentUser
//   );

//   const items = useSelector((state: RootState) => state.myBooks.items);
//   const status = useSelector((state: RootState) => state.myBooks.status);
//   const error = useSelector((state: RootState) => state.myBooks.error);

//   const audiences = useSelector((state: RootState) => state.audiences.items);
//   const categories = useSelector((state: RootState) => state.categories.items);
//   const authors = useSelector((state: RootState) => state.authors.items);

//   const [addOpen, setAddOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const [pendingSessionId, setPendingSessionId] = useState<string | undefined>();

//   const [flippedCard, setFlippedCard] = useState<string | null>(null);

//   const [book, setBook] = useState({
//     id: "",
//     name: "",
//     categoryId: "",
//     audienceId: "",
//     authorId: "",
//   });

//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
//   useEffect(() => {
//     dispatch(getAudiences());
//     dispatch(getAuthors());
//     dispatch(getCategories());

//     if (currentUser?.id) {
//       dispatch(getMyBooks());
//     }
//   }, [dispatch, currentUser?.id]);

//   const categoryMap = useMemo(() => {
//     const m: Record<string, string> = {};
//     categories.forEach((c: any) => (m[c.id] = c.name));
//     return m;
//   }, [categories]);

//   const authorMap = useMemo(() => {
//     const m: Record<string, string> = {};
//     authors.forEach((a: any) => (m[a.id] = a.name));
//     return m;
//   }, [authors]);

//   const audienceMap = useMemo(() => {
//     const m: Record<string, string> = {};
//     audiences.forEach((a: any) => (m[a.id] = a.name));
//     return m;
//   }, [audiences]);

//   const handleAdd = async () => {
//     if (!currentUser?.id) return;

//     try {
//       await dispatch(
//         addBook({
//           ...book,
//           collaboratorId: currentUser.id,
//         })
//       ).unwrap();

//       setSuccessMsg("הספר נוסף בהצלחה");
//       setErrorMsg(null);

//       setBook({
//         id: "",
//         name: "",
//         categoryId: "",
//         audienceId: "",
//         authorId: "",
//       });

//       setAddOpen(false);
//       dispatch(getMyBooks());
//     } catch (err: any) {
//       setErrorMsg(err?.message || "שגיאה בהוספת הספר");
//       setSuccessMsg(null);
//     }
//   };

//   const handleDelete = (sessionId?: string) => {
//     if (!sessionId) return;
//     setPendingSessionId(sessionId);
//     setDeleteOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!pendingSessionId) return;

//     try {
//       await axios.put(
//         `${apiUrl}/api/BookSession/${pendingSessionId}/archiveAndDelete`
//       );

//       dispatch(getMyBooks());
//     } catch {
//       setErrorMsg("שגיאה במחיקה");
//     } finally {
//       setDeleteOpen(false);
//       setPendingSessionId(undefined);
//     }
//   };

//   const handleCancelDelete = () => {
//     setDeleteOpen(false);
//     setPendingSessionId(undefined);
//   };

//   if (!currentUser) return <div>יש להתחבר למערכת</div>;

//   return (
//   <Container maxWidth="md" sx={{ mt: 8 }}>
//     <Typography variant="h4">הספרים שלי</Typography>

//     <Button sx={{ mt: 2 }} variant="contained" onClick={() => setAddOpen(true)}>
//       הוספת ספר
//     </Button>

//     {error && <Typography color="error">{error}</Typography>}
//     {errorMsg && <Typography color="error">{errorMsg}</Typography>}
//     {successMsg && <Typography color="primary">{successMsg}</Typography>}

//     {status === "loading" && <Typography>טוען...</Typography>}

//     <Stack spacing={3} sx={{ mt: 3 }}>
//       {!items.length && status !== "loading" ? (
//         <Typography>אין ספרים עדיין</Typography>
//       ) : (
//         items.map((item: any) => {
//           const sessionId = item?.id || item?.bookSessionId;
//           const book = item?.book;

//           const isFlipped = flippedCard === sessionId;

//           return (
//             <Box
//               key={sessionId}
//               sx={{
//                 perspective: "1200px",
//               }}
//               onClick={() =>
//                 setFlippedCard(isFlipped ? null : sessionId)
//               }
//             >
//               <Box
//                 sx={{
//                   position: "relative",
//                   transformStyle: "preserve-3d",
//                   transition: "transform 0.6s ease",
//                   transform: isFlipped
//                     ? "rotateY(180deg)"
//                     : "rotateY(0deg)",
//                   minHeight: 140,
//                 }}
//               >
//                 {/* FRONT */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     width: "100%",
//                     backfaceVisibility: "hidden",
//                     p: 2,
//                     borderRadius: 3,
//                     backgroundColor: "background.paper",
//                     boxShadow: 2,
//                   }}
//                 >
//                   {!isFlipped && (
//                     <>
//                       <Typography variant="h6">
//                         {book?.name}
//                       </Typography>

//                       <Button
//                         color="error"
//                         sx={{ mt: 2 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(sessionId);
//                         }}
//                       >
//                         מחיקה
//                       </Button>
//                     </>
//                   )}
//                 </Box>

//                 {/* BACK */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     width: "100%",
//                     backfaceVisibility: "hidden",
//                     transform: "rotateY(180deg)",
//                     p: 2,
//                     borderRadius: 3,
//                     backgroundColor: "background.paper",
//                     boxShadow: 2,
//                   }}
//                 >
//                   {isFlipped && (
//                     <>
//                       <Typography>
//                         מחבר: {authorMap[book?.authorId]}
//                       </Typography>

//                       <Typography>
//                         קטגוריה: {categoryMap[book?.categoryId]}
//                       </Typography>

//                       <Typography>
//                         קהל יעד: {audienceMap[book?.audienceId]}
//                       </Typography>
//                     </>
//                   )}
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })
//       )}
//     </Stack>

//     {/* ADD */}
//     <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
//       <DialogTitle>הוספת ספר</DialogTitle>

//       <DialogContent>
//         <TextField
//           fullWidth
//           label="שם הספר"
//           value={book.name}
//           onChange={(e) => setBook({ ...book, name: e.target.value })}
//           sx={{ mt: 2 }}
//         />

//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>קטגוריה</InputLabel>
//           <Select
//             value={book.categoryId}
//             onChange={(e) =>
//               setBook({ ...book, categoryId: String(e.target.value) })
//             }
//           >
//             {categories.map((c: any) => (
//               <MenuItem key={c.id} value={c.id}>
//                 {c.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>קהל יעד</InputLabel>
//           <Select
//             value={book.audienceId}
//             onChange={(e) =>
//               setBook({ ...book, audienceId: String(e.target.value) })
//             }
//           >
//             {audiences.map((a: any) => (
//               <MenuItem key={a.id} value={a.id}>
//                 {a.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth sx={{ mt: 2 }}>
//           <InputLabel>מחבר</InputLabel>
//           <Select
//             value={book.authorId}
//             onChange={(e) =>
//               setBook({ ...book, authorId: String(e.target.value) })
//             }
//           >
//             {authors.map((a: any) => (
//               <MenuItem key={a.id} value={a.id}>
//                 {a.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={() => setAddOpen(false)}>ביטול</Button>
//         <Button variant="contained" onClick={handleAdd}>
//           שמור
//         </Button>
//       </DialogActions>
//     </Dialog>

//     {/* DELETE */}
//     <Dialog open={deleteOpen} onClose={handleCancelDelete}>
//       <DialogTitle>אישור מחיקה</DialogTitle>
//       <DialogContent>האם אתה בטוח?</DialogContent>
//       <DialogActions>
//         <Button onClick={handleCancelDelete}>ביטול</Button>
//         <Button color="error" onClick={handleConfirmDelete}>
//           מחיקה
//         </Button>
//       </DialogActions>
//     </Dialog>
//   </Container>
// );
// };

// export default Library;