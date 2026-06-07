import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO, BookSessionDTO } from "../../types/book";
import { getApiUrl } from "../../types/env";

const apiUrl: string = getApiUrl();
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
        console.log(response.data);

        return response.data;
    }
);
export interface BooksState {
    items: BookSessionDTO[],
    status: String,
    error: String | undefined,
}
const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: undefined
};

const MyBooksSlice = createSlice({
    name: 'myBooks',
    initialState,
    reducers: {
        addData: (state: BooksState, action) => {
            console.log(action);
            state.items = [...state.items, action.payload];
        },
        // deleteAllData:()
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
                state.error = action.error.message;
            })
            .addCase(getMyBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyBooks.fulfilled, (state, action) => {
                console.log("REDUX PAYLOAD:", action.payload);
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getMyBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
})
export default MyBooksSlice.reducer