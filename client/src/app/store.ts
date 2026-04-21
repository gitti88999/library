import { configureStore } from '@reduxjs/toolkit'
import tableSlice from './../components/tableSlice'

export const store = configureStore({
    reducer: {
        tableData: tableSlice,
        
    },
})

