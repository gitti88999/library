
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
import type { AppDispatch, RootState } from "../../app/store";
import { getMyBooks, addBook } from "./LibrarySlice";
import { BookDTO } from "../../types/book";
import { getAudiences } from './AudienceSlice';
import { getAuthors } from './AuthorSlice';
import { getCategories } from './CategorySlice';

const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Hooks חייבים להיות בתוך הקומפוננטה
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState<BookDTO>({
    name: "",
    categoryId: "",
    audienceId: "",
    authorId: "",
  });

  // משתמש נוכחי
  const currentUser = useSelector(
    (state: RootState) => state.myUser.currentUser
  );
  const allState = useSelector((state: RootState) => state);


  // ספרים
  const  items  = useSelector((state: RootState) => state.myBooks.items);
  console.log(items);
  const  status  = useSelector((state: RootState) => state.myBooks.status);
  const  error  = useSelector((state: RootState) => state.myBooks.error);

  // רשימות לבחירה
  const audiences = useSelector((state: RootState) => state.audiences.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  const authors = useSelector((state: RootState) => state.authors.items);

  useEffect(() => {
    dispatch(getAudiences());
    dispatch(getAuthors());
    dispatch(getCategories());
    console.log(currentUser);

    if (currentUser?.id) {
      dispatch(getMyBooks());
      console.log('dispatch get my books');
    }
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    console.log({status});
    
    switch (status) {
      case "succeeded":
        console.log({ items })
        break;
      case "failed":
        console.log({ error })
        break
    }
  }, [status])

  const safeAudiences = useMemo(() => audiences ?? [], [audiences]);
  const safeAuthors = useMemo(() => authors ?? [], [authors]);
  const safeCategories = useMemo(() => categories ?? [], [categories]);
  // Fetch ספרים כשמשתמש מחובר
  // useEffect(() => {
  //   if (currentUser?.id) {
  //     dispatch(getMyBooks());
  //   }
  // }, [dispatch, currentUser?.id]);

  // הוספת ספר חדש
  const handleAdd = async () => {
    try {
      const res = await dispatch(addBook(book));
      await dispatch(getMyBooks());
      // console.log("res",res.payload.name);
      setBook({ name: "", categoryId: "", audienceId: "", authorId: "" });
      setOpen(false);
      dispatch(getMyBooks());
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) return <div>יש להתחבר למערכת</div>;
  if (status === "loading") return <div>טוען ספרים...</div>;
  if (status === "failed") return <div>{error}</div>;


  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        הספרים שלי
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
        הוספת ספר חדש
      </Button>

      <Stack spacing={2}>
        {items.length === 0 ? (

          <Typography>אין ספרים להצגה</Typography>
        ) : (
          items.map((item) => (
            <Card key={item.bookSessionId}>
              <CardContent>
                <Typography variant="h6">{item.book.name ?? item.book.name}</Typography>

                <Typography color="text.secondary">
                  מחבר: {item.book.authorId}
                </Typography>

                <Typography color="text.secondary">
                  קטגוריה: {item.book.categoryId} | קהל יעד: {item.book.audienceId}
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