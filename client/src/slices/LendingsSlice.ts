import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getNearbySessionsApi = (data: {
  bookId: string;
  userLat: number;
  userLng: number;
}) => {
  return api.post("/api/Lendings/nearby", data);
};

export const fetchNearbySessions = createAsyncThunk(
  "lendings/fetchNearby",
  async (data: { bookId: string; userLat: number; userLng: number }, thunkAPI) => {
    try {
      const res = await getNearbySessionsApi(data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Error fetching nearby sessions"
      );
    }
  }
);
export type NearbySession = {
  bookSessionId: string;
  collaboratorId: string;
  collaboratorName: string;
  lat: number;
  lng: number;
  distanceKm: number;
};



type Status = "idle" | "loading" | "succeeded" | "failed";

interface LendingsState {
  items: NearbySession[];
  status: Status;
  error: string | null;
}

const initialState: LendingsState = {
  items: [],
  status: "idle",
  error: null,
};

const lendingsSlice = createSlice({
  name: "lendings",
  initialState,
  reducers: {
    clearNearbySessions: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbySessions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNearbySessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNearbySessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearNearbySessions } = lendingsSlice.actions;
export default lendingsSlice.reducer;