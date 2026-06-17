import { configureStore } from '@reduxjs/toolkit'
import myBooksReducer from '../slices/LibrarySlice'
import AllBooksSlice from '../slices/SearchSlice'
import AudienceSlice from '../slices/AudienceSlice';
import AuthorSlice from '../slices/AuthorSlice';
import CategorySlice from '../slices/CategorySlice';
import userReducer from '../slices/UserSlice'
import lendingsReducer from "../slices/LendingsSlice"; 

export const store = configureStore({
  reducer: {
    allBooks: AllBooksSlice,
    myBooks: myBooksReducer,
    myUser: userReducer,
    audiences: AudienceSlice,
    categories: CategorySlice,
    authors: AuthorSlice,
    lendings: lendingsReducer
  },
  devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


