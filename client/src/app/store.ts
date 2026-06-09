import {configureStore} from '@reduxjs/toolkit'
import  MyBooksSlice from '../components/MyBooks/MyBooksSlice'
import AllBooksSlice  from '../Pages/Search/SearchSlice'
import  userSlice from '../Pages/Register/RegisterSlice'
import loginReducer from "../Pages/Login/LoginSlice";
import AudienceSlice from '../Pages/Library/AudienceSlice';
import AuthorSlice from '../Pages/Library/AuthorSlice';
import CategorySlice from '../Pages/Library/CategorySlice';
export const store = configureStore({
  reducer: {
    allBooks:AllBooksSlice,
    myBooks: MyBooksSlice,
    myUser:userSlice,
    auth:loginReducer,
    audiences:AudienceSlice,
    categories:CategorySlice,
    authors:AuthorSlice
    
  },devTools: true,
   
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


