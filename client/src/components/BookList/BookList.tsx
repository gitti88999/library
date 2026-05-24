import React from 'react';
import type{ Book } from '../../types/book';

interface Props {
  books: Book[];
  deleteBook: (id: number) => void;
}

const BookList: React.FC<Props> = ({ books, deleteBook }) => (
  <ul>
    {books.map(book => (
      <li key={book.id}>
        {book.title} - {book.author} 
        <button onClick={() => deleteBook(book.id)}>מחק</button>
      </li>
    ))}
  </ul>
);

export default BookList;