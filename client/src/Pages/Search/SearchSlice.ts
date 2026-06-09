import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO} from "../../types/book";
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
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
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
        state.status = 'loading'; 
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.error.message ?? null;
      });
  },
});

export default AllBooksSlice.reducer;