import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addData, fetchPosts} from "./tableSlice";

export default function TableData() {
    const dispatch = useDispatch();
    
    const stateTable = useSelector(state => state.tableData);
    const items = stateTable.items;
    const status = stateTable.status;
    

    useEffect(() => {
            dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        
    }, [items]);

    const addItem = () => {
        dispatch(addData({id:111,userId: 'ssss'}));
    }
    return (
        // <>{status=='loading' ? <>loading!!!!</> :
        //     <><div>{status}</div>
        //     <button onClick={addItem}>ADD</button>
        //     <table>
        //         <thead><th>
        //         </th></thead>
                
        //         <tbody>
        //         {items.map((item)=> {
        //             return <tr><td key={item.id}>{item.id}</td></tr>
        //         })}
        //         </tbody>
        //     </table></>}
        // </>
    )
}