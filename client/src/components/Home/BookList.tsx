// components/BookList.tsx
import React from "react";
import { Grid, Card, CardContent, Typography, Button, CardActions } from "@mui/material";
// import type { Book } from "../../App";

interface BookListProps {
  books: Book[];
  removeBook: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, removeBook }) => {
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography color="textSecondary">מחבר: {book.author}</Typography>
              <Typography color="textSecondary">קטגוריה: {book.category}</Typography>
              <Typography color="textSecondary">קהל יעד: {book.audience}</Typography>
            </CardContent>
            <CardActions>
              <Button color="error" variant="contained" onClick={() => removeBook(book.id)}>
                מחק
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;