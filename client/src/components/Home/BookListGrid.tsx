import { useEffect, useState } from 'react';
import type { FC, CSSProperties } from 'react';// ✅ type-only import
import type { Book } from './types';

const BookListGrid: FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    // const fetchBooks = async () => {
    //     const response = await fetch('http://127.0.0.1:5000/books');
    //     const data: Book[] = await response.json();
    //     setBooks(data);
    // };

    // const toggleAvailability = async (id: number, current: boolean) => {
    //     await fetch(`http://127.0.0.1:5000/books/${id}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ available: !current }),
    //     });
    //     fetchBooks();
    // };

    // const deleteBook = async (id: number) => {
    //     await fetch(`http://127.0.0.1:5000/books/${id}`, { method: 'DELETE' });
    //     fetchBooks();
    // };

    // useEffect(() => { fetchBooks(); }, []);

    return (
        <div style={styles.grid}>
            {books.map((book) => (
                <div key={book.id} style={styles.card}>
                    <h3>{book.title}</h3>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Shared by:</strong> {book.shared_by}</p>
                    <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
                    {/* <button onClick={() => toggleAvailability(book.id, book.available)}>Toggle</button>
                    <button onClick={() => deleteBook(book.id)} style={styles.deleteBtn}>Delete</button> */}
                </div>
            ))}
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 20,
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 15,
        backgroundColor: '#f9f9f9',
    },
    deleteBtn: {
        marginLeft: 10,
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: 4,
    },
};

export default BookListGrid;