// // components/BookList.tsx
// import React from "react";
// import {  Card, CardContent, Typography, Button, CardActions } from "@mui/material";
// import type { BookDTO } from "../../types/book";
// import Grid from "@mui/material/Grid"
// interface BookListProps {
//   books: BookDTO[];
//   removeBook: (id: number) => void;
// }

// const BookList: React.FC<BookListProps> = ({ books, removeBook }) => {
//   return (
//     <Grid container spacing={3}>
//       {books.map((book) => (
//         <Grid item xs={12} sm={6} md={4} key={book.name}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">{book.name}</Typography>
//               <Typography color="textSecondary">מחבר: {book.authorId}</Typography>
//               <Typography color="textSecondary">קטגוריה: {book.category}</Typography>
//               <Typography color="textSecondary">קהל יעד: {book.audienceId}</Typography>
//             </CardContent>
//             <CardActions>
//               <Button color="error" variant="contained" onClick={() => removeBook(book.id)}>
//                 מחק
//               </Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default BookList;