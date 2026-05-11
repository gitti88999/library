import {configureStore} from '@reduxjs/toolkit'
import  MyBooksSlice from '../components/MyBooks/MyBooksSlice'

export const store = configureStore({
  reducer: {
    myBooks: MyBooksSlice,
    
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

