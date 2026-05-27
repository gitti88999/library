// Search.tsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import type { Book } from '../../types/book';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [results, setResults] = useState<Book[]>([]);

  // טעינת ספרים
  useEffect(() => {
    const loadBooks = () => {
      const storedBooks = localStorage.getItem('books');

      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      } else {
        setBooks([]);
      }
    };

    loadBooks();

    window.addEventListener('storage', loadBooks);

    return () => {
      window.removeEventListener('storage', loadBooks);
    };
  }, []);

  // חיפוש בזמן אמת
  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, books]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        חיפוש ספרים
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
        {results.map((book) => (
          <Card key={book.id} sx={{ bgcolor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">
                {book.title}
              </Typography>

              <Typography color="text.secondary">
                {book.author}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Search;