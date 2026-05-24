import React, { useEffect } from "react";
import './MyBooks.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, type BooksState } from "./MyBooksSlice.ts";
import type { AppDispatch, RootState } from "../../app/store.ts";

function MyBooks(){
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const books:BooksState = useSelector((state:RootState) => state.myBooks);
    


    useEffect(() => {
            dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        
    }, [books]);
    return<>
        <div>hello</div>
    </>
}
export default MyBooks

