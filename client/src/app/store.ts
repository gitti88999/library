import { configureStore } from '@reduxjs/toolkit'
import myBooksReducer from '../Pages/Library/LibrarySlice'
import AllBooksSlice from '../Pages/Search/SearchSlice'

import AudienceSlice from '../Pages/Library/AudienceSlice';
import AuthorSlice from '../Pages/Library/AuthorSlice';
import CategorySlice from '../Pages/Library/CategorySlice';
import userReducer from '../Pages/UserSlice'
// import borrowBookReducer from "../Pages/BorrowBook/BorrowBookSlice";

export const store = configureStore({
  reducer: {
    allBooks: AllBooksSlice,
    myBooks: myBooksReducer,
    myUser: userReducer,
    audiences: AudienceSlice,
    categories: CategorySlice,
    authors: AuthorSlice,
    // borrowBook: borrowBookReducer,

  },
  devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


