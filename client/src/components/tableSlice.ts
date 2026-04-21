import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    console.log(response);
    
    return await response.json();
});

const initialState = {
    items: [],
    status: '',
    error:'',
}

export const tableSlice = createSlice({
    name: 'tableData',
    initialState,
    reducers: {
        addData: (state, action) => {
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
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';  
                state.items = [...action.payload];
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})

// Action creators are generated for each case reducer function
export const { addData } = tableSlice.actions

export default tableSlice.reducer