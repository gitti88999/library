import {configureStore} from '@reduxjs/toolkit'
import AllBooksSlice  from '../Pages/Search/SearchSlice'
import MyBooksSlice  from '../Pages/Library/LibrarySlice'
export const store = configureStore({
  reducer: {
    allBooks:AllBooksSlice,
    myBooks:MyBooksSlice,
  },
  devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


