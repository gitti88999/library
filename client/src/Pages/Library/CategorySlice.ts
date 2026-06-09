import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Category } from "../../types/book";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCategories = createAsyncThunk(
  "categorys/getCategories",
  async () => {
    const response = await axios.get<Category[]>(`${apiUrl}/api/category`);
    return response.data ?? [];
  }
);

interface CategoryState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: CategoryState = {
  items: [],
  status: "idle",
};

const CategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.items = action.payload;
})
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default CategorySlice.reducer;