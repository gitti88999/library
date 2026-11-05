import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { getAudiences } from "../slices/AudienceSlice";
import { getAuthors } from "../slices/AuthorSlice";
import { getCategories } from "../slices/CategorySlice";
import {
  addBook,
  getMyBooks,
  toggleBookSessionStatus,
} from "../slices/LibrarySlice";
import type { Audience, Author, Category } from "../types/book";

const apiUrl = import.meta.env.VITE_API_URL;

const Library: FC = () => {
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
  const [pendingSessionId, setPendingSessionId] = useState<string>();
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

  const categoryMap = useMemo(
    () =>
      categories.reduce<Record<string, string>>(
        (map, category: Category) => {
          map[category.id] = category.name;
          return map;
        },
        {}
      ),
    [categories]
  );

  const authorMap = useMemo(
    () =>
      authors.reduce<Record<string, string>>((map, author: Author) => {
        map[author.id] = author.name;
        return map;
      }, {}),
    [authors]
  );

  const audienceMap = useMemo(
    () =>
      audiences.reduce<Record<string, string>>(
        (map, audience: Audience) => {
          map[audience.id] = audience.name;
          return map;
        },
        {}
      ),
    [audiences]
  );

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
    } catch (err: unknown) {
      setErrorMsg(
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "שגיאה בהוספת הספר"
      );
      setSuccessMsg(null);
    }
  };

  const handleDelete = (sessionId: string) => {
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
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => setAddOpen(true)}
      >
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
          items.map((item) => {
            const sessionId = item.bookSessionId;
            const bookDetails = item.book;

            return (
              <Card key={sessionId}>
                <CardContent>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      dispatch(toggleBookSessionStatus(sessionId))
                    }
                  >
                    {item.enabled ? "השבת" : "הפעל"}
                  </Button>
                  <Typography variant="h6">{bookDetails.name}</Typography>
                  <Typography>{item.status}</Typography>
                  <Typography>
                    מחבר: {authorMap[bookDetails.authorId]}
                  </Typography>
                  <Typography>
                    קטגוריה: {categoryMap[bookDetails.categoryId]} | קהל יעד:{" "}
                    {audienceMap[bookDetails.audienceId]}
                  </Typography>
                  <Button
                    color="error"
                    onClick={() => handleDelete(sessionId)}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </Stack>

      <Dialog open={addOpen} onClose={() => setAddOpen(false)}>
        <DialogTitle>הוספת ספר</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="שם הספר"
            value={book.name}
            onChange={(event) =>
              setBook({ ...book, name: event.target.value })
            }
            sx={{ mt: 2 }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={book.categoryId}
              onChange={(event) =>
                setBook({ ...book, categoryId: String(event.target.value) })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>קהל יעד</InputLabel>
            <Select
              value={book.audienceId}
              onChange={(event) =>
                setBook({ ...book, audienceId: String(event.target.value) })
              }
            >
              {audiences.map((audience) => (
                <MenuItem key={audience.id} value={audience.id}>
                  {audience.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>מחבר</InputLabel>
            <Select
              value={book.authorId}
              onChange={(event) =>
                setBook({ ...book, authorId: String(event.target.value) })
              }
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
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
