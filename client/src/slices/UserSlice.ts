import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { NewUser, User, UserResponse } from "../types/user";
import { useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

/* ---------- Types ---------- */

interface Book {
  id: string;
  name: string;
}



interface UserState {
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  profileOpen: boolean;
  isAuthChecked: boolean;
  authLoading: boolean;

}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
  profileOpen: false,
  isAuthChecked: false,
  authLoading: true, 
}

const mapUser = (payload: any) => ({
  id: payload.collaboratorId,
  name: payload.name ?? payload.collaborator?.name,
  email: payload.email ?? payload.collaborator?.email,
  books: payload.bookSessions || [],
  latitude: payload.latitude ?? payload.collaborator?.latitude,
  longitude: payload.longitude ?? payload.collaborator?.longitude,
});
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: { name: string; password: string }) => {

    const res = await axios.post(`${apiUrl}/api/Auth/login`
      , data, { withCredentials: true });
    return res.data;
  }
);
export const addUser = createAsyncThunk<UserResponse, NewUser>(
  "user/addUser",
  async (user: NewUser) => {
    const response = await axios.post<UserResponse>(
      `${apiUrl}/api/Auth/register`,
      user
    );

    return response.data;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: any) => {
    const res = await axios.post(`${apiUrl}/api/Auth/register`, data);
    return res.data;
  }
);
export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async () => {
    const res = await fetch(`${apiUrl}/api/Auth/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("not authenticated");
    }

    return await res.json();
  }
);

export const searchAddress = async (query: string) => {
  const res = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: query,
      format: "json",
      limit: 5,
    },
    headers: {
      "X-Client": "web"
    }
  });
  return res.data;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = mapUser(action.payload);
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.status = "succeeded";
        state.currentUser = mapUser(action.payload);
      })

      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register user";
      })
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        const c = action.payload.collaborator;
        state.currentUser = mapUser(action.payload);

        state.isAuthChecked = true;
        state.status = "succeeded";
      })

      .addCase(fetchMe.rejected, (state) => {
        state.currentUser = null;
        state.isAuthChecked = true;
        state.status = "failed";
      })
      /* REGISTER */
      .addCase(registerUser.fulfilled, (state, action) => {
        const c = action.payload.collaborator;
        state.currentUser = mapUser(action.payload);
      });
  },
});
export const { setAuthChecked, logout, setCurrentUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;