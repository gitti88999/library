import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO } from "../../types/book";
import { getApiUrl } from "../../types/env";

const apiUrl: string = getApiUrl();

export const getBooks = createAsyncThunk<BookDTO[]>(
  "books/getBooks",
  async () => {
    const response = await axios.get<BookDTO[]>(`${apiUrl}/api/Book/books`);
    return response.data;
  }
);

export interface BooksState {
  items: BookDTO[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

const AllBooksSlice = createSlice({
  name: "allBooks",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<BookDTO>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<BookDTO[]>) => {
        console.log("REDUX PAYLOAD:", action.payload);
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default AllBooksSlice.reducer;