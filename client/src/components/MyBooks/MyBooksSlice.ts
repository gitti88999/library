import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl: string = import.meta.env.VITE_API_URL;
console.log(apiUrl);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch(`${apiUrl}/api/Collaborator/collaborator/3bba5fe8-a0bc-4d0e-9a02-076e227e9643/booksessions`);
    console.log(response);

    return await response.json();
});
export const addBook = createAsyncThunk(
    "posts/addBook",
    async (Book: any) => {
         const response = await axios.post(
      `${apiUrl}/api/Book`,Book
    );

        return await response.data;
    }
);
// export const addUser=createAsyncThunk(
//     "post/addUser",
//     async(User:any)=>{
//         const response=await axios.post(
//             "http://localhost:5216/api/Auto/register",User
//         );
//         return await response.data;
//     }

// )
export interface BooksState {
    items: Array<any>,
    status: String,
    error: String | undefined,
}
const initialState: BooksState = {
    items: [],
    status: '',
    error: '',
}

export const MyBooksSlice = createSlice({
    name: 'myBooks',
    initialState,
    reducers: {
        addData: (state: BooksState, action) => {
            console.log(action);
            state.items = [...state.items, action.payload];
        },
        // deleteAllData:()
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state: BooksState, action) => {
                state.status = 'succeeded';
                state.items = [...action.payload];
            })
            .addCase(fetchPosts.rejected, (state: BooksState, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addBook.pending, (state) => {
                state.status = "loading";
            })
 
            .addCase(addBook.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })

            .addCase(addBook.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // .addCase(addUser.pending, (state) => {
            //     state.status = "loading";
            // })

            // .addCase(addUser.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.items.push(action.payload);
            // })

            // .addCase(addUser.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.error.message;
            // })
    },
})
export const { addData } = MyBooksSlice.actions

export default MyBooksSlice.reducer