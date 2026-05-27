import React, { useEffect, useState } from "react";
import './MyBooks.css'
import { useDispatch, useSelector } from "react-redux";
import { addBook, fetchPosts, type BooksState } from "./MyBooksSlice.ts";
import type { AppDispatch, RootState } from "../../app/store.ts";

function MyBooks() {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const books: BooksState = useSelector((state: RootState) => state.myBooks);


    const [book, setBook] = useState({
        name: "",
        category: 1,
        audienceId: 1,
        autherId: 1
    });
    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {

    }, [books]);
    const handleAddBook = () => {

        dispatch(addBook(book));
    };

    return <>
        <div>COLOBORATE LIBRARY!!!!!!!!!!!!!!</div>
        <input
            type="text"
            placeholder="name"
            value={book.name}
            onChange={(e) =>
                setBook({ ...book, name: e.target.value })
            }
        />
        <button onClick={handleAddBook}>
            Add Book
        </button>

    </>
}
export default MyBooks

