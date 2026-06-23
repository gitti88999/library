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
// } from "@mui/material";

// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../app/store";

// import { getMyBooks, addBook } from "../slices/LibrarySlice";
// import { BookDTO, BooksStatus } from "../types/book";

// import { getAudiences } from "../slices/AudienceSlice";
// import { getAuthors } from "../slices/AuthorSlice";
// import { getCategories } from "../slices/CategorySlice";

// import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;


// const Library: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const currentUser = useSelector(
//     (state: RootState) => state.myUser.currentUser
//   );
// const [pendingSessionId, setPendingSessionId] = useState<string | undefined>(undefined);
//   const items = useSelector((state: RootState) => state.myBooks.items);
//   const status = useSelector((state: RootState) => state.myBooks.status);
//   const error = useSelector((state: RootState) => state.myBooks.error);

//   const audiences = useSelector((state: RootState) => state.audiences.items);
//   const categories = useSelector((state: RootState) => state.categories.items);
//   const authors = useSelector((state: RootState) => state.authors.items);

// const [addOpen, setAddOpen] = useState(false);
// const [deleteOpen, setDeleteOpen] = useState(false);
//   const [book, setBook] = useState<BookDTO>({
//     id: "",
//     name: "",
//     categoryId: "",
//     audienceId: "",
//     authorId: "",
//   });

//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
//     (categories ?? []).forEach((c: any) => (m[c.id] = c.name));
//     return m;
//   }, [categories]);

//   const authorMap = useMemo(() => {
//     const m: Record<string, string> = {};
//     (authors ?? []).forEach((a: any) => (m[a.id] = a.name));
//     return m;
//   }, [authors]);

//   const audienceMap = useMemo(() => {
//     const m: Record<string, string> = {};
//     (audiences ?? []).forEach((a: any) => (m[a.id] = a.name));
//     return m;
//   }, [audiences]);

//   const handleAdd = async () => {
//     if (!currentUser?.id) return;

//     try {
//       await dispatch(
//         addBook({
//           name: book.name,
//           categoryId: book.categoryId,
//           audienceId: book.audienceId,
//           authorId: book.authorId,
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

//       await dispatch(getMyBooks());
//     } catch (err: any) {
//       setErrorMsg(err?.message || "שגיאה בהוספת הספר");
//       setSuccessMsg(null);
//     }
//   };
// const handleDelete  = (sessionId?: string) => {
//   if (!sessionId) return;
//   setPendingSessionId(sessionId);
//   setDeleteOpen(true);
// };
//  const handleConfirmDelete = async () => {
//   if (!pendingSessionId) return;

//   try {
//     await axios.put(
//       `${apiUrl}/api/BookSession/${pendingSessionId}/archiveAndDelete`
//     );

//     await dispatch(getMyBooks());
//   } catch (err) {
//     setErrorMsg("שגיאה במחיקה");
//   } finally {
//     setDeleteOpen(false);
//     setPendingSessionId(undefined);
//   }
// };
// const getStatusMessage = () => {
//   if (status === BooksStatus.Failed) {
//     return "שגיאה בטעינת נתונים";
//   }

//   if (status === BooksStatus.Loading) {
//     return "טוען...";
//   }

//   return "";
// };
// const handleCancelDelete = () => {
//   setDeleteOpen(false);
//   setPendingSessionId(undefined);
// };

//  if (!currentUser) return <div>יש להתחבר למערכת</div>;
// // if (!items.length) {
// //   return (
// //     <div>
// //       <div>אין ספרים עדיין</div>

// //       <Button variant="contained" onClick={() => setAddOpen(true)}>
// //         הוספת ספר
// //       </Button>
// //     </div>
// //   );
// // }
//   return (
    
//     <Container maxWidth="md" sx={{ mt: 8 }}>
//       <Typography variant="h4" gutterBottom>
//         הספרים שלי
//       </Typography>

//       <Button variant="contained" onClick={() => setAddOpen(true)}>
//         הוספת ספר
//       </Button>

//       {error && (
//         <Typography color="error" sx={{ mt: 2 }}>
//           {error}
//         </Typography>
//       )}

//       {errorMsg && (
//         <Typography color="error">{errorMsg}</Typography>
//       )}

//       {successMsg && (
//         <Typography color="primary">{successMsg}</Typography>
//       )}

      
//       <Stack spacing={2} sx={{ mt: 3 }}>
//         {items.length === 0 ? (
//           <Typography>אין ספרים</Typography>
//         ) : (
//           items.map((item: any) => {
//             const sessionId = item?.id || item?.bookSessionId;
//             const book = item?.book;

//             return (
              
//               <Card
//                 key={sessionId}
//                 sx={{
//                   borderRadius: 2,
//                   boxShadow: 2,
//                   transition: "0.2s",
//                   "&:hover": { transform: "scale(1.01)" },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="h6">
//                     {book?.name}
//                   </Typography>

//                   <Typography color="text.secondary">
//                     מחבר: {authorMap[book?.authorId]}
//                   </Typography>

//                   <Typography color="text.secondary">
//                     קטגוריה: {categoryMap[book?.categoryId]} | קהל יעד:{" "}
//                     {audienceMap[book?.audienceId]}
//                   </Typography>

//                   <Button
//                     color="error"
//                     sx={{ mt: 1 }}
//                     onClick={() => handleDelete(sessionId)}
//                   >
//                     מחיקה
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </Stack>
//       <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
//         <DialogTitle>הוספת ספר</DialogTitle>

//         <DialogContent>
//           <TextField
//             fullWidth
//             label="שם הספר"
//             value={book.name}
//             onChange={(e) =>
//               setBook({ ...book, name: e.target.value })
//             }
//             sx={{ mt: 2 }}
//           />

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>קטגוריה</InputLabel>
//             <Select
//               value={book.categoryId}
//               onChange={(e) =>
//                 setBook({ ...book, categoryId: String(e.target.value) })
//               }
//             >
//               {categories.map((c: any) => (
//                 <MenuItem key={c.id} value={c.id}>
//                   {c.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>קהל יעד</InputLabel>
//             <Select
//               value={book.audienceId}
//               onChange={(e) =>
//                 setBook({ ...book, audienceId: String(e.target.value) })
//               }
//             >
//               {audiences.map((a: any) => (
//                 <MenuItem key={a.id} value={a.id}>
//                   {a.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>מחבר</InputLabel>
//             <Select
//               value={book.authorId}
//               onChange={(e) =>
//                 setBook({ ...book, authorId: String(e.target.value) })
//               }
//             >
//               {authors.map((a: any) => (
//                 <MenuItem key={a.id} value={a.id}>
//                   {a.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setAddOpen(false)}>ביטול</Button>
//           <Button variant="contained" onClick={handleAdd}>
//             שמור
//           </Button>
//         </DialogActions>
//       </Dialog>
//        <Dialog open={deleteOpen} onClose={handleCancelDelete}>
//       <DialogTitle>אישור מחיקה</DialogTitle>

//       <DialogContent>
//         האם אתה בטוח שברצונך למחוק את הספר?
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleCancelDelete}>ביטול</Button>
//         <Button color="error" onClick={handleConfirmDelete}>
//           מחיקה
//         </Button>
//       </DialogActions>
//     </Dialog>
//     </Container>
//   );
// };

// export default Library;

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
                    מחיקה
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