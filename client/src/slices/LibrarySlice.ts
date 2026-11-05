import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../app/store";
import { BooksStatus } from "../types/book";
import type { BookSessionDTO } from "../types/book";

const apiUrl: string = import.meta.env.VITE_API_URL;

interface AddBookRequest {
  name: string;
  categoryId: string;
  audienceId: string;
  authorId: string;
  collaboratorId: string;
}

interface ToggleBookSessionResponse {
  bookSessionId: string;
  enabled: boolean;
  status: string;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data;
    return typeof responseMessage === "string"
      ? responseMessage
      : error.message;
  }

  return error instanceof Error ? error.message : fallback;
}

export const getMyBooks = createAsyncThunk<
  BookSessionDTO[],
  void,
  { state: RootState; rejectValue: string }
>("myBooks/getMyBooks", async (_, thunkAPI) => {
  const userId = thunkAPI.getState().myUser.currentUser?.id;
  if (!userId) return thunkAPI.rejectWithValue("User not logged in");

  try {
    const response = await axios.get<BookSessionDTO[]>(
      `${apiUrl}/api/Collaborator/${userId}/booksessions`
    );
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "Failed to load books")
    );
  }
});

export const archiveAndDeleteBookSession = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("myBooks/archiveAndDelete", async (id, thunkAPI) => {
  try {
    await axios.put(`${apiUrl}/api/BookSession/${id}/archiveAndDelete`);
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "שגיאה במחיקת הספר")
    );
  }
});

export const addBook = createAsyncThunk<
  unknown,
  AddBookRequest,
  { rejectValue: string }
>("myBooks/addBook", async (request, thunkAPI) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/BookSession/add-with-session`,
      request
    );
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "שגיאה בהוספת הספר")
    );
  }
});

export const toggleBookSessionStatus = createAsyncThunk<
  ToggleBookSessionResponse,
  string,
  { rejectValue: string }
>("myBooks/toggleStatus", async (sessionId, thunkAPI) => {
  try {
    const response = await axios.patch<ToggleBookSessionResponse>(
      `${apiUrl}/api/BookSession/${sessionId}/toggle-status`
    );
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "שגיאה בעדכון סטטוס")
    );
  }
});

export interface BooksState {
  items: BookSessionDTO[];
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
  reducers: {
    clearBooks: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyBooks.pending, (state) => {
        state.status = BooksStatus.Loading;
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        state.status = BooksStatus.Succeeded;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.status = BooksStatus.Failed;
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(toggleBookSessionStatus.fulfilled, (state, action) => {
        const session = state.items.find(
          (item) => item.bookSessionId === action.payload.bookSessionId
        );

        if (session) {
          session.enabled = action.payload.enabled;
          session.status = action.payload.status;
        }
      })
      .addCase(toggleBookSessionStatus.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(addBook.pending, (state) => {
        state.status = BooksStatus.Loading;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.status = BooksStatus.Succeeded;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(archiveAndDeleteBookSession.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.bookSessionId !== action.meta.arg
        );
      })
      .addCase(archiveAndDeleteBookSession.rejected, (state, action) => {
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { clearBooks } = myBooksSlice.actions;
export default myBooksSlice.reducer;
