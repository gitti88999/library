// src/store/loginSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  password: string;
  books: any[];
}

interface LoginState {
  user: User | null;
}

const initialState: LoginState = {
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;