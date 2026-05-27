import React, { useState } from 'react';
import type{ Book } from '../../types/Book';

interface Props {
  addBook: (book: Book) => void;
}

const BookForm: React.FC<Props> = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = () => {
    if (!title || !author) return;
    addBook({ id: Date.now(), title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <input placeholder="כותרת הספר" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="מחבר" value={author} onChange={e => setAuthor(e.target.value)} />
      <button onClick={handleSubmit}>הוסף ספר</button>
    </div>
  );
};

export default BookForm;