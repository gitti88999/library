import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO } from "../../types/book";
import { getApiUrl } from "../../types/env";

const apiUrl: string = getApiUrl();

// Thunk לקבלת ספרים
export const getBooks = createAsyncThunk<BookDTO[]>(
  "books/getBooks",
  async () => {
    const response = await axios.get<BookDTO[]>(`${apiUrl}/api/Book/books`);
    return response.data;
  }
);

// טיפוס מצב הספרים
export interface BooksState {
  items: BookDTO[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// מצב התחלתי
const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

// Slice
const AllBooksSlice = createSlice({
  name: "allBooks",
  initialState,
  reducers: {
    // הוספת ספר ידנית
    addData: (state, action: PayloadAction<BookDTO>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<BookDTO[]>) => {
        console.log("REDUX PAYLOAD:", action.payload);
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { addData } = AllBooksSlice.actions;
export default AllBooksSlice.reducer;