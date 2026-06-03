// import React, { useEffect, useState } from "react";
// import './MyBooks.css'
// import { useDispatch, useSelector } from "react-redux";
// import { addBook, addUser, fetchPosts, type BooksState } from "./MyBooksSlice.ts";
// import type { AppDispatch, RootState } from "../../app/store.ts";

// function MyBooks() {
//     const dispatch: AppDispatch = useDispatch<AppDispatch>();
//     const books: BooksState = useSelector((state: RootState) => state.myBooks);


//     const [book, setBook] = useState({
//         name: "",
//         category: 1,
//         audienceId: 1,
//         autherId: 1
//     });
    
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         Password:"",
//         citId: 1,
//         Street:"",
//         Building:1,
//         Apartment:1,
//     });
//     useEffect(() => {
//         dispatch(fetchPosts());
//     }, []);

//     useEffect(() => {

//     }, [books]);
    
//     const handleAddBook = () => {

//         dispatch(addBook(book));
//     };
//      const handleAddUser = () => {

//         dispatch(addUser(user));
//     };


//     return <>
//         <div>COLOBORATE LIBRARY!!!!!!!!!!!!!!</div>
//         <input
//             type="text"
//             placeholder="name"
//             value={book.name}
//             onChange={(e) =>
//                 setBook({ ...book, name: e.target.value })
//             }
//         />
//         {/* <button
//     onClick={() =>
//         dispatch(
//             toggleBookSession(
//                 "3bba5fe8-a0bc-4d0e-9a02-076e227e9643"
//             )
//         )
//     }
// >
//     Toggle Book Session
// </button> */}
//         <button onClick={handleAddBook}>
//             Add Book
//         </button>
//        <input
//             type="text"
//             placeholder="name user"
//             value={user.name}
//             onChange={(e) =>
//         setUser({ ...user, name: e.target.value })
//     }
// />
//         <button onClick={handleAddUser}>
//             Add User
//         </button>
//     </>
// }
// export default MyBooks

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
  typeof book.name === "string" &&
  book.name.toLowerCase().includes(query.toLowerCase())
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