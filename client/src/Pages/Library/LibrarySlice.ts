import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO, BookSessionDTO } from "../../types/book";
import { getApiUrl } from "../../types/env";

const apiUrl: string = getApiUrl();

export const addBook = createAsyncThunk(
  "posts/addBook",
  async (book: BookDTO) => {
    const response = await axios.post(`${apiUrl}/api/Book`, book);
    return response.data;
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
  items: BookSessionDTO[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

const MyBooksSlice = createSlice({
  name: "myBooks",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<BookSessionDTO>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<BookSessionDTO>) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(getMyBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMyBooks.fulfilled, (state, action: PayloadAction<BookSessionDTO[]>) => {
        console.log("REDUX PAYLOAD:", action.payload);
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default MyBooksSlice.reducer;