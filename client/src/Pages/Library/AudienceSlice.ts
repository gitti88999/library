// audiencesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Audience } from "../../types/book";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAudiences = createAsyncThunk(
  "audiences/getAudiences",
  async () => {
    const response = await axios.get<Audience[]>(`${apiUrl}/api/Audience`);
    return response.data ?? [];
  }
);

interface AudiencesState {
  items: Audience[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: AudiencesState = {
  items: [],
  status: "idle",
};

const audiencesSlice = createSlice({
  name: "audiences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAudiences.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAudiences.fulfilled, (state, action) => {
    console.log("REDUX PAYLOAD:", action.payload); // 🔍 האם זה ריק?
    state.status = "succeeded";
    state.items = action.payload;
})
      .addCase(getAudiences.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default audiencesSlice.reducer;