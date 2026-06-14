import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

/* ---------- Types ---------- */

interface Book {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  books: Book[];
}
interface NewUser {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}
interface UserResponse {
  collaboratorId: string;
  name: string;
  email: string;
  latitude: number;
  longitude: number;
  token?: string;
}
interface UserState {
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  profileOpen: boolean;
}
const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
  profileOpen: false,
};
// interface UserState {
//   currentUser: User | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: UserState = {
//   currentUser: null,
//   status: "idle",
//   error: null,
// };

/* ---------- Async (LOGIN) ---------- */

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data: { name: string; password: string }) => {
    const res = await axios.post(`${apiUrl}/api/Auth/login`, data);
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
    console.log("REGISTER RESPONSE:", response.data); // 👈 חשוב

    return response.data;
  }
);
/* ---------- Async (REGISTER) ---------- */

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: any) => {
    const res = await axios.post(`${apiUrl}/api/Auth/register`, data);
    return res.data;
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
/* ---------- Slice ---------- */

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

      /* LOGIN */
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = {
          id: action.payload.collaboratorId,
          name: action.payload.name,
          email: action.payload.email,
          books: action.payload.bookSessions || [],
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
          books: [], // API לא מחזיר ספרים ברישום
        };
      })

      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to register user";
      })
      /* REGISTER */
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = {
          id: action.payload.collaboratorId,
          name: action.payload.name,
          email: action.payload.email,
          books: action.payload.bookSessions || [],
        };
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;