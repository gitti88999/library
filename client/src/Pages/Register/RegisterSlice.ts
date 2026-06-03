import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;
// טיפוס משתמש חדש
interface NewUser {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}

// Async thunk
export const addUser = createAsyncThunk(
  "user/addUser",
  async (user: NewUser) => {
    const response = await axios.post(
      `${apiUrl}/api/Auth/register`,
      user
    );
    return response.data;
  }
  
);

// סטייט
interface UserState {
  currentUser: NewUser | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

// סלייס
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<NewUser>) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register user";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;