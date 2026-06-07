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

// טיפוס של ה־state
export interface BooksState {
  items: BookDTO[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// initial state תואם לטסטים
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
        state.error = null; // טסטים מצפים ל-null
      })
      .addCase(getBooks.fulfilled, (state, action: PayloadAction<BookDTO[]>) => {
        console.log("REDUX PAYLOAD:", action.payload);
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null; // חובה ל-null כדי שהטסט יעבור
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default AllBooksSlice.reducer;