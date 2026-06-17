
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
import { getAudiences } from '../slices/AudienceSlice';
import { getAuthors } from '../slices/AuthorSlice';
import { getCategories } from '../slices/CategorySlice';
const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

 
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<BookDTO>({
    id:"",
    name: "",
    categoryId: "",
    audienceId: "",
    authorId: "",
    
  });
 
  const currentUser = useSelector(
    (state: RootState) => state.myUser.currentUser
  );
  const [refresh, setRefresh] = useState(false);

  const  items  = useSelector((state: RootState) => state.myBooks.items);
  const  status  = useSelector((state: RootState) => state.myBooks.status);
  const  error  = useSelector((state: RootState) => state.myBooks.error);

  const audiences = useSelector((state: RootState) => state.audiences.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const authors = useSelector((state: RootState) => state.authors.items);
const books = useSelector(
  (state: RootState) => state.myBooks.items
);
 useEffect(() => {
  dispatch(getAudiences());
  dispatch(getAuthors());
  dispatch(getCategories());
}, [dispatch]);

useEffect(() => {
  if (currentUser?.id) {
    dispatch(getMyBooks());
  }
}, [dispatch, currentUser?.id]);


  const safeAudiences = useMemo(() => audiences ?? [], [audiences]);
  const safeAuthors = useMemo(() => authors ?? [], [authors]);
  const safeCategories = useMemo(() => categories ?? [], [categories]);
 const onlyBooks: BookDTO[] = books.map(item => item.book ?? item).filter(Boolean);
  

const [successMsg, setSuccessMsg] = useState<string | null>(null);
const [errorMsg, setErrorMsg] = useState<string | null>(null);

const handleAdd = async () => {
  if (!currentUser?.id) return;

  try {
    const result = await dispatch(
      addBook({
        name: book.name,
        categoryId: book.categoryId,
        audienceId: book.audienceId,
        authorId: book.authorId,
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
    setOpen(false);
    await dispatch(getMyBooks());
  } catch (err: any) {
    setSuccessMsg(null);

    setErrorMsg(
      typeof err === "string"
        ? err
        : err?.data || err?.message || "הספר כבר קיים או שגיאה בהוספה"
    );
  }
};
  if (!currentUser) return <div>יש להתחבר למערכת</div>;
  if (status === "loading") return <div>טוען ספרים...</div>;
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        הספרים שלי
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
        הוספת ספר חדש
      </Button>

      <Stack spacing={2}>
        {onlyBooks.length === 0 ? (

          <Typography>אין ברשותך ספרים</Typography>
        ) : (
          onlyBooks.map((book) => (
    <Card key={book.id ?? book.name}>
    <CardContent>
      <Typography variant="h6">{book.name}</Typography>
      <Typography color="text.secondary">מחבר: {book.authorId}</Typography>
      <Typography color="text.secondary">
        קטגוריה: {book.categoryId} | קהל יעד: {book.audienceId}
      </Typography>
    </CardContent>
  </Card>
))
        )}
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>הוספת ספר</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="שם הספר"
              value={book.name}
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>קטגוריה</InputLabel>
              <Select
                value={book.categoryId || ''}
                label="קטגוריה"
                onChange={(e) =>
                  setBook({ ...book, categoryId: String(e.target.value) })
                }
              >
                {safeCategories.map((c: any) => (
                  <MenuItem key={c.id ?? c.Id} value={c.id ?? c.Id}>
                    {c.name ?? c.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>קהל יעד</InputLabel>
              <Select
                value={book.audienceId || ''}
                label="קהל יעד"
                onChange={(e) =>
                  setBook({ ...book, audienceId: String(e.target.value) })
                }
              >
                {safeAudiences.map((a: any) => (
                  <MenuItem key={a.id ?? a.Id} value={a.id ?? a.Id}>
                    {a.name ?? a.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>מחבר</InputLabel>
              <Select
                value={book.authorId || ''}
                label="מחבר"
                onChange={(e) =>
                  setBook({ ...book, authorId: String(e.target.value) })
                }
              >
                {safeAuthors.map((a: any) => (
                  <MenuItem key={a.id ?? a.Id} value={a.id ?? a.Id}>
                    {a.name ?? a.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleAdd}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Library;