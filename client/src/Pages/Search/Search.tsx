import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import type{ Book } from '../../types/book';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [results, setResults] = useState<Book[]>([]);

  // טען ספרים מה-localStorage בעת התחלת הרכיב
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) setBooks(JSON.parse(storedBooks));
  }, []);

  // מאזין לשינויים ב-localStorage בזמן אמת
  useEffect(() => {
    const handleStorageChange = () => {
      const storedBooks = localStorage.getItem('books');
      if (storedBooks) setBooks(JSON.parse(storedBooks));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // עדכון תוצאות לפי query בכל שינוי ב-query או ב-books
  useEffect(() => {
    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, books]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>חיפוש ספרים</Typography>
      <TextField
        label="חפש לפי שם ספר או סופר"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List>
        {results.map((book) => (
          <ListItem key={book.id}>
            <ListItemText primary={book.title} secondary={book.author} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Search;