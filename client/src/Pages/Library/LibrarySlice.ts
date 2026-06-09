import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO, BookSessionDTO } from "../../types/book";

const apiUrl: string = import.meta.env.VITE_API_URL;
export const addBook = createAsyncThunk(
    "posts/addBook",
    async (Book: BookDTO) => {
        const response = await axios.post(
            `${apiUrl}/api/Book`, Book
        );

        return await response.data;
    }
);

export const getMyBooks = createAsyncThunk(
    "books/getBooks",
    async () => {
        const response = await axios.get<BookSessionDTO[]>(
            `${apiUrl}/api/Collaborator/3bba5fe8-a0bc-4d0e-9a02-076e227e9643/booksessions`
        );

        return response.data;
    }
);
export interface BooksState {
    items: BookSessionDTO[],
    status: String,
    error: String | null,
}
const initialState: BooksState = {
    items: [],
    status: '',
    error: null,
}

const MyBooksSlice = createSlice({
    name: 'myBooks',
    initialState,
    reducers: {
        addData: (state: BooksState, action) => {
            state.items = [...state.items, action.payload];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addBook.pending, (state) => {
                state.status = "loading";
            })

            .addCase(addBook.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })

            .addCase(addBook.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message??null;
            })
            .addCase(getMyBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getMyBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message??null;
            })
    },
})
export default MyBooksSlice.reducer