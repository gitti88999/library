import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface NearbySessionsRequest {
  bookId: string;
  userLat: number;
  userLng: number;
}

interface BorrowRequest {
  bookSessionId: string;
  AName: string;
  AEmail: string;
  BName: string;
  BEmail: string;
}

export interface NearbySession {
  bookSessionId: string;
  collaboratorId: string;
  collaboratorName: string;
  collaboratorEmail: string;
  lat: number;
  lng: number;
  distanceKm: number;
}

type ThunkConfig = { rejectValue: string };
type Status = "idle" | "loading" | "succeeded" | "failed";

interface LendingsState {
  items: NearbySession[];
  status: Status;
  error: string | null;
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

export const getNearbySessionsApi = (request: NearbySessionsRequest) =>
  api.post<NearbySession[]>("/api/Lendings/nearby", request);

export const fetchNearbySessions = createAsyncThunk<
  NearbySession[],
  NearbySessionsRequest,
  ThunkConfig
>("lendings/fetchNearby", async (request, thunkAPI) => {
  try {
    const response = await getNearbySessionsApi(request);
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "Error fetching nearby sessions")
    );
  }
});

export const requestBorrow = createAsyncThunk<
  unknown,
  BorrowRequest,
  ThunkConfig
>("lendings/requestBorrow", async (request, thunkAPI) => {
  try {
    const response = await api.post("/api/Lendings/request", request);
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "Request failed")
    );
  }
});

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
        state.error = action.payload ?? action.error.message ?? null;
      })
      .addCase(requestBorrow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(requestBorrow.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(requestBorrow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { clearNearbySessions } = lendingsSlice.actions;
export default lendingsSlice.reducer;
