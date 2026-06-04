import {configureStore} from '@reduxjs/toolkit'
import  MyBooksSlice from '../components/MyBooks/MyBooksSlice'
import AllBooksSlice  from '../Pages/Search/SearchSlice'
import  userSlice from '../Pages/Register/RegisterSlice'
import loginReducer from "../Pages/Login/LoginSlice";
export const store = configureStore({
  reducer: {
    allBooks:AllBooksSlice,
    myBooks: MyBooksSlice,
    myUser:userSlice,
    auth:loginReducer,
    
  },devTools: true,
   
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


