// // src/store/loginSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   books: any[];
//   token?: string;
// }

// interface LoginState {
//   user: User | null;
// }

// const initialState: LoginState = {
//   user: null,
// };
// interface UserState {
//   id: string | null;
//   name: string | null;
//   email: string | null;
// }
// const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<User>) => {
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//     },
//   },
// });

// export const { setUser, logout } = loginSlice.actions;
// export default loginSlice.reducer;