// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, Stack, Card, CardContent, CardActions } from '@mui/material';
// // import type { Book } from '../../types/book';
// import { addBook,type BookDTO, getMyBooks, type BookSessionDTO } from './LibrarySlice';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from '../../app/store';

// const Library: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const books = useSelector((state: RootState) => state.myBooks.items);
//  useEffect(() => {
//     console.log("dispatching getBooks");
//     dispatch(getMyBooks());
//   }, [dispatch]);
//   const [book, setBook] = useState<BookDTO>({
//     name: "",
//     category: 1,
//     audienceId: 1,
//     authorId: 1
//   });
//   // חיפוש בזמן אמת (ללא state נוסף)
// const results = books ? books.filter((b: BookSessionDTO) =>
//   (b.book.name || '').toLowerCase().includes((b.book.name || '').toLowerCase())
// ) : [];
//   const handleAddBooks = () => {
//     dispatch(addBook(book));
//     dispatch(getMyBooks())
//   };
// console.log(books);

//   return (
//     <Container maxWidth="md" sx={{ mt: 8 }}>
//       <Typography variant="h4" gutterBottom>הספרים שלי</Typography>
// <Stack spacing={2}>
//   {results.length === 0 ? (
//   <Typography>אין ספרים להצגה</Typography>
// ) : (
//   results.map((item: BookSessionDTO) => (
//     <Card key={item.bookSessionId} sx={{ bgcolor: '#f5f5f5' }}>
//             <CardContent>
//               <Typography variant="h6">
//                 {item.book.name}
//               </Typography>

//               <Typography color="text.secondary">
//                 {item.book.authorId}
//               </Typography>
//             </CardContent>
//           </Card>
//   ))
// )}
//         {/* {results.map((book:BookDTO) => (
//           <Card key={book.name} sx={{ bgcolor: '#f5f5f5' }}>
//             <CardContent>
//               <Typography variant="h6">
//                 {book.name}
//               </Typography>

//               <Typography color="text.secondary">
//                 {book.authorId}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))} */}
//       </Stack>


//       <input
//         type="text"
//         placeholder="name"
//         value={book.name}
//         onChange={(e) =>
//           setBook({ ...book, name: e.target.value })
//         }
//       />
//       <input
//         type="text"
//         placeholder="choose author"
//         value={book.category}
//        onChange={(e) =>
//   setBook({
//     ...book,
//     category: Number(e.target.value)
//   })
// }
//       />
//       <input
//         type="text"
//         placeholder="choose audience"
//         value={book.audienceId}
//        onChange={(e) =>
//   setBook({
//     ...book,
//     audienceId: Number(e.target.value)
//   })
// }
//       />
//       <input
//         type="text"
//         placeholder="choose audience"
//         value={book.authorId}
//        onChange={(e) =>
//   setBook({
//     ...book,
//     authorId: Number(e.target.value)
//   })
// }
//       />
//       <button onClick={handleAddBooks}>
//         Add Book (API)
//       </button>
//     </Container>
//   );
// };

// export default Library;
// Library.tsx
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
  TextField
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { getMyBooks, addBook } from './LibrarySlice';
import type { BookDTO, BookSessionDTO } from '../../types/book';

const Library: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.myBooks.items);
  const [open, setOpen] = useState(false);

  const [book, setBook] = useState<BookDTO>({
    name: '',
    category: 1,
    audienceId: 1,
    authorId: 1,
  });

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
              onChange={(e) => setBook({ ...book, category: Number(e.target.value) })}
            />
            <TextField
              label="Audience ID"
              type="number"
              value={book.audienceId}
              onChange={(e) => setBook({ ...book, audienceId: Number(e.target.value) })}
            />
            <TextField
              label="Author ID"
              type="number"
              value={book.authorId}
              onChange={(e) => setBook({ ...book, authorId: Number(e.target.value) })}
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