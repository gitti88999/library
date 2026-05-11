import React, { useEffect } from "react";
import './MyBooks.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, type BooksState } from "./MyBooksSlice.ts";
function MyBooks(){
    const dispatch = useDispatch();
    const books:BooksState = useSelector((state:any) => state.myBooks);
    


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

