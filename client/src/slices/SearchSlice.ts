import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BookDTO, BooksStatus} from "../types/book";
const apiUrl: string = import.meta.env.VITE_API_URL;
export const getBooks = createAsyncThunk<BookDTO[]>(
  "books/getBooks",
  async () => {
    const response = await axios.get<BookDTO[]>(`${apiUrl}/api/Book/books`);
    return response.data;
  }
);
export interface BooksState {
  items: BookDTO[];
  status: BooksStatus; 
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: BooksStatus.Idle,
  error: null,
};

const AllBooksSlice = createSlice({
  name: 'allBooks',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = BooksStatus.Loading; 
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = BooksStatus.Succeeded; 
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = BooksStatus.Failed; 
        state.error = action.error.message ?? null;
      });
  },
});

export default AllBooksSlice.reducer;