import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('http://localhost:5216/api/Collaborator/collaborator/3bba5fe8-a0bc-4d0e-9a02-076e227e9643/booksessions');
    console.log(response);
    
    return await response.json();
});
export interface BooksState {
  items: Array<any>,
    status: String,
    error:String|undefined,
}
const initialState:BooksState = {
    items: [],
    status: '',
    error:'',
}

export const MyBooksSlice = createSlice({
    name: 'myBooks',
    initialState,
    reducers: {
        addData: (state:BooksState, action) => {
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
            .addCase(fetchPosts.fulfilled, (state:BooksState, action) => {
                state.status = 'succeeded';  
                state.items = [...action.payload];
            })
            .addCase(fetchPosts.rejected, (state:BooksState, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})
export const { addData } = MyBooksSlice.actions

export default MyBooksSlice.reducer