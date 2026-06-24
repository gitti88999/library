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
 locationGranted: boolean;
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
  profileOpen: false,
  isAuthChecked: false,
  authLoading: true, 
  locationGranted: false

};
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: { name: string; password: string }) => {

    const res = await axios.post(`${apiUrl}/api/Auth/login`
      , data,{ withCredentials: true });
    console.log("LOGIN RESPONSE:", res.data);
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
setLocationGranted: (state, action: PayloadAction<boolean>) => {
  state.locationGranted = action.payload;
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
        const c = action.payload.collaborator;

        state.currentUser = {
          id: action.payload.collaboratorId,
          name: c?.name,
          email: c?.email,
          books: action.payload.bookSessions || [],
          latitude: c?.latitude,
          longitude: c?.longitude
        };
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(addUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.status = "succeeded";
        state.currentUser = {
          id: action.payload.collaboratorId,
          name: action.payload.name,
          email: action.payload.email,
          books: [],
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        };
      })

      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register user";
      })
      .addCase(fetchMe.pending, (state) => {
  state.status = "loading";
})

.addCase(fetchMe.fulfilled, (state, action) => {
  state.currentUser = {
          id: action.payload.collaboratorId,
          name: action.payload.name,
          email: action.payload.email,
          books: [],
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        };

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
        state.currentUser = {
          id: action.payload.collaboratorId,
          name: action.payload.name,
          email: action.payload.email,
          books: action.payload.bookSessions || [],
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        };
      });
  },
});
export const { setAuthChecked, setLocationGranted,logout,setCurrentUser, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;