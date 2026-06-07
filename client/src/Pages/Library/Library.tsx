
import React, { useState, useEffect } from 'react';
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
  FormControl
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { getMyBooks, addBook } from './LibrarySlice';
import type { BookDTO, BookSessionDTO } from '../../types/book';
import { getAudiences } from './AudienceSlice';

const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.myBooks.items);
  const audiences = useSelector((state: RootState) => state.audiences.items);
  const [open, setOpen] = useState(false);
  
  const [book, setBook] = useState<BookDTO>({
    name: '',
    category: 1,
    audienceId: '', // Guid string
    authorId: 1,
  });
useEffect(() => {
  console.log("dispatch getAudiences");

  dispatch(getAudiences())
    .unwrap()
    .then((res) => console.log("THEN:", res))
    .catch((err) => console.log("CATCH:", err));

}, [dispatch]);
  useEffect(() => {
    dispatch(getMyBooks());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAdd = () => {
    dispatch(addBook(book));
    dispatch(getMyBooks());
    handleClose();
  };

  const results = (books || []).filter(
    (b: BookSessionDTO) => b && b.book && b.book.name
  );

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        הספרים שלי
      </Typography>

      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        הוספת ספר חדש
      </Button>

      <Stack spacing={2}>
        {results.length === 0 ? (
          <Typography>אין ספרים להצגה</Typography>
        ) : (
          results.map((item: BookSessionDTO) => (
            <Card key={item.bookSessionId}>
              <CardContent>
                <Typography variant="h6">
                  {item.book.name}
                </Typography>
                <Typography color="text.secondary">
                  Author ID: {item.book.authorId}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>הוספת ספר</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="שם הספר"
              value={book.name}
              onChange={(e) => setBook({ ...book, name: e.target.value })}
            />
            <TextField
              label="קטגוריה"
              type="number"
              value={book.category}
              onChange={(e) =>
                setBook({ ...book, category: Number(e.target.value) })
              }
            />

            <FormControl fullWidth>
              <InputLabel>קהל יעד</InputLabel>
              <Select
                value={book.audienceId}
                label="קהל יעד"
                onChange={(e) =>
                  setBook({ ...book, audienceId: e.target.value as string })
                }
              >
                {audiences?.length === 0 ? (
                  <MenuItem disabled>טוען...</MenuItem>
                ) : (
                  audiences.map((a: any) => (
                    <MenuItem key={a.id} value={a.id}>
                      {a.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <TextField
              label="Author ID"
              type="number"
              value={book.authorId}
              onChange={(e) =>
                setBook({ ...book, authorId: Number(e.target.value) })
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button variant="contained" onClick={handleAdd}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Library;