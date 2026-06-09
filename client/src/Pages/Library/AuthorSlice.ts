import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Author } from "../../types/book";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAuthors = createAsyncThunk(
  "authors/getAuthors",
  async () => {
    const response = await axios.get<Author[]>(`${apiUrl}/api/author`);
    return response.data ?? [];
  }
);

interface AuthorsState {
  items: Author[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: AuthorsState = {
  items: [],
  status: "idle",
};

const AuthorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthors.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.items = action.payload;
})
      .addCase(getAuthors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AuthorsSlice.reducer;