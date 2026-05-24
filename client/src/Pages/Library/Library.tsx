import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
import type{ Book } from '../../types/book';

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) setBooks(JSON.parse(storedBooks));
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = () => {
    const title = prompt('שם הספר:');
    const author = prompt('שם המחבר:');
    if (title && author) {
      const newBook: Book = { id: Date.now(), title, author };
      setBooks((prev) => [...prev, newBook]);
    }
  };

  const handleDelete = (id: number) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>הספרים שלי</Typography>
      <Button variant="contained" color="primary" onClick={handleAddBook} sx={{ mb: 4 }}>
        הוסף ספר
      </Button>
      <Stack spacing={2}>
        {books.map((book) => (
          <Card key={book.id} sx={{ bgcolor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography color="text.secondary">{book.author}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="error" onClick={() => handleDelete(book.id)}>
                מחק
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Library;