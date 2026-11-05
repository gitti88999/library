import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchPosts } from './MyBooksSlice';

const MyBooks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const booksState = useSelector((state: RootState) => state.myBooks);
  const [query, setQuery] = useState('');

  // טעינה מהשרת פעם אחת
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // חיפוש בזמן אמת
  const results = booksState.items.filter((book) =>
  typeof book.book.name === "string" &&
  book.book.name.toLowerCase().includes(query.toLowerCase())
);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        ספרים
      </Typography>

      <TextField
        fullWidth
        label="חפש ספר או מחבר"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Stack spacing={2}>
        {results.map((book: any) => (
          <Card key={book.id || book.CollaboratorId} sx={{ bgcolor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">
                {book.name}
              </Typography>
              <Typography color="text.secondary">
                {book.autherId || book.AutherId || 'מחבר לא ידוע'}
              </Typography>
              <Typography color="text.secondary">
                קטגוריה: {book.category || 'לא מוגדר'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default MyBooks;