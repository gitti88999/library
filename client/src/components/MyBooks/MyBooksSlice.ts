import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://localhost:5173/getBooks');
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