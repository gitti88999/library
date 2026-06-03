import {configureStore} from '@reduxjs/toolkit'
import  MyBooksSlice from '../components/MyBooks/MyBooksSlice'
import  userSlice from '../Pages/Register/RegisterSlice'
export const store = configureStore({
  reducer: {
    myBooks: MyBooksSlice,
    myUser:userSlice,
    
  },devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

