
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BookDTO, BookSessionDTO, BooksStatus } from "../types/book";
import { RootState } from "../app/store";

const apiUrl: string = import.meta.env.VITE_API_URL;


export const getMyBooks = createAsyncThunk(
  "myBooks/getMyBooks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.myUser.currentUser?.id;
    if (!userId) throw new Error("User not logged in");
    try {
      const response = await axios.get<BookSessionDTO[]>(
        `${apiUrl}/api/Collaborator/${userId}/booksessions`
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? err?.message ?? "Failed to load books"
      );
    }
  }
);



interface AddBookRequest {
  name: string;
  categoryId: string;
  audienceId: string;
  authorId: string;
  collaboratorId: string;
}

export const archiveAndDeleteBookSession = createAsyncThunk(
  "myBooks/archiveAndDelete",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/BookSession/${id}/archiveAndDelete`
      );

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "שגיאה במחיקת הספר"
      );
    }
  }
);
export const addBook = createAsyncThunk(
  "myBooks/addBook",
  async (request: AddBookRequest, thunkAPI) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/BookSession/add-with-session`,
        request
      );

      return response.data;
    } 
    catch (err: any) {

  return thunkAPI.rejectWithValue(
    err.response?.data || "שגיאה בהוספת הספר"
  );
}

  }
);
export interface BooksState {
  items: BookSessionDTO[] ;
  status: BooksStatus;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: BooksStatus.Idle,
  error: null,
};

const myBooksSlice = createSlice({
  name: "myBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBooks.pending, (state) => {
        state.status = BooksStatus.Loading;
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.status = BooksStatus.Succeeded;
        state.items = action.payload; 
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.status = BooksStatus.Failed;
        state.error = action.error.message || "Failed to load books";
      })
      .addCase(addBook.pending, (state) => {
        state.status = BooksStatus.Loading;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<BookSessionDTO>) => {
        state.status = BooksStatus.Succeeded;
        // Push the new book to the list immediately
        // state.items?.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        // state.status = "failed";
        // state.error = action.error.message || "Failed to add book";
          state.error = action.payload as string;

      })
      .addCase(archiveAndDeleteBookSession.fulfilled, (state, action) => {
      state.items = state.items.filter(
      (x: any) => x.id !== action.meta.arg
        );
      })
    .addCase(archiveAndDeleteBookSession.rejected, (state, action) => {
      state.error = action.payload as string;
    })
  },
});

export default myBooksSlice.reducer;
