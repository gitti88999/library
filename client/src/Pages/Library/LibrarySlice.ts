// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { BookDTO, BookSessionDTO } from "../../types/book";
// import { RootState } from "../../app/store";

// const apiUrl: string = import.meta.env.VITE_API_URL;

// export interface BooksState {
//     items: BookSessionDTO[],
//     status: String,
//     error: String | null,
// }
// const initialState: BooksState = {
//     items: [],
//     status: '',
//     error: null,
// }

// export const addBook = createAsyncThunk(
//     "posts/addBook",
//     async (Book: BookDTO) => {
//         const response = await axios.post(
//             `${apiUrl}/api/Book`, Book
//         );
//             console.log("Book.name",Book.name);
//             console.log("response.data",response.data);


//         return await response.data;
//     }
// );

// // export const getMyBooks = createAsyncThunk(
// //     "books/getBooks",
// //     async () => {
// //         const response = await axios.get<BookSessionDTO[]>(
// //             `${apiUrl}/api/Collaborator/3bba5fe8-a0bc-4d0e-9a02-076e227e9643/booksessions`
// //         );

// //         return response.data;
// //     }
// // );
// export const getMyBooks = createAsyncThunk(
//   "books/getBooks",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState() as RootState;

//     const userId = state.myUser.currentUser?.id;
//     console.log("userId:", userId);
//     if (!userId) {
//       throw new Error("User not logged in");
//     }

//     const response = await axios.get<BookSessionDTO[]>(
//       `${apiUrl}/api/Collaborator/${userId}/booksessions`
//     );
//         console.log("response.data:", response.data);


//     return response.data;
//   }
// );
// const MyBooksSlice = createSlice({
//     name: 'myBooks',
//     initialState,
//     reducers: {
//         addData: (state: BooksState, action) => {
//             state.items = [...state.items, action.payload];
//         },
//     },
//     extraReducers: builder => {
//         builder
//             .addCase(addBook.pending, (state) => {
//                 state.status = "loading";
//             })

//             // .addCase(addBook.fulfilled, (state, action) => {
//             //     state.status = "succeeded";
//             //     state.items.push(action.payload);
//             // })

//             .addCase(addBook.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message??null;
//             })
//             .addCase(getMyBooks.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(getMyBooks.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.items = action.payload;
//             })
//             .addCase(getMyBooks.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message??null;
//             })
//     },
// })
// export default MyBooksSlice.reducer
// src/components/MyBooks/MyBooksSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { BookDTO, BookSessionDTO } from "../../types/book";
import { RootState } from "../../app/store";

const apiUrl: string = import.meta.env.VITE_API_URL;

// Fetch books for the current user
export const getMyBooks = createAsyncThunk(
  "myBooks/getMyBooks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const userId = state.myUser.currentUser?.id;
    console.log("Fetching books for userId:", userId);
    if (!userId) throw new Error("User not logged in");
    try {
      const response = await axios.get<BookSessionDTO[]>(
        `${apiUrl}/api/Collaborator/${userId}/booksessions`
      );
      console.log("Fetched books:", response.data);
      return response.data;
    } catch (err: any) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err?.response?.data ?? err?.message ?? "Failed to load books"
      );
    }
  }
);

// Add a new book
export const addBook = createAsyncThunk<BookSessionDTO, BookDTO>(
  "myBooks/addBook",
  async (book) => {
    const response = await axios.post<BookSessionDTO>(`${apiUrl}/api/Book`, book);
    return response.data;
  }
);

export interface BooksState {
  items: BookSessionDTO[] | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  status: "idle",
  error: null,
};

const myBooksSlice = createSlice({
  name: "myBooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMyBooks.fulfilled, (state, action) => {
        console.log('success')
        state.status = "succeeded";
        state.items = action.payload; 
        // console.log("state.items",state.items);// <-- כאן מעדכן את רשימת הספרים
      })
      .addCase(getMyBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load books";
      })
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<BookSessionDTO>) => {
        state.status = "succeeded";
        // Push the new book to the list immediately
        state.items?.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add book";
      });
  },
});

export default myBooksSlice.reducer;