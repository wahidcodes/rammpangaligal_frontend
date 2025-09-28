//@ts-nocheck

import { useEffect, useState } from "react";
import api from "../utils/api";
import { ACCESS_TOKEN } from "../utils/constants";

const ViewData = () => {
    
    useEffect(()=>{
        obtainData();
    },[])

    const [data, setData] = useState([]);

    const obtainData = async () => {
        const res = await api.get('/extraInfo/addInfo',{
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
            },
        });
        const data = await res.data;
        setData(data);
        console.log(data);
    }
    
    return (
        <>
            View Data
            <div>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>username</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((d)=>{
                        return (
                            <tr key={d.phone_no}>
                                <td>{d.username}</td>
                                <td>{d.phone_no}</td>
                                <td>{d.address}</td>
                                <td>{new Date(d.created_at).toLocaleDateString("en-US")}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
 
export default ViewData;