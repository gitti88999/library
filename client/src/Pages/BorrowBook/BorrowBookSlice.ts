// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = "http://localhost:5000/api";

// // קבלת ספר לפי session או לפי bookId (תלוי בשרת שלך)
// export const fetchBookSessionsByBookId = createAsyncThunk(
//   "borrowBook/fetchBookSessionsByBookId",
//   async (bookId: string) => {
//     const res = await axios.get(`${API}/bookSessions/book/${bookId}`);
//     return res.data;
//   }
// );

// interface BorrowBookState {
//   sessions: any[];
//   status: "idle" | "loading" | "failed";
// }

// const initialState: BorrowBookState = {
//   sessions: [],
//   status: "idle",
// };

// const borrowBookSlice = createSlice({
//   name: "borrowBook",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookSessionsByBookId.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchBookSessionsByBookId.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.sessions = action.payload;
//       })
//       .addCase(fetchBookSessionsByBookId.rejected, (state) => {
//         state.status = "failed";
//       });
//   },
// });

// export default borrowBookSlice.reducer;