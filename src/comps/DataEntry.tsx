//@ts-nocheck
import { useState } from "react";
import api from "../utils/api";
import { ACCESS_TOKEN } from "../utils/constants";

const DataEntry = () => {

    const [phone_no, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');

    const submitData = async () => {
        const userObject = {phone_no, address};
        console.log(userObject)
        try{
                const res = await api.post("/extraInfo/addInfo/", JSON.stringify(userObject),{
                    headers: {
                        "Content-Type" : 'application/json',
                        "Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
                    }
                })
                console.log(res.status)
                if(res.status === 200 || res.status === 201){
                    console.log("account created")
                }

        } catch (err){
            //console.log("FetchAPI error:", err)
            if(err.response.data.username[0]){
                alert("username already exist")
            }
        }

    }

    return (
        <>
            Data Entry
            <div>
                Phone No : <input type="text" onChange={(e)=>setPhoneNo(e.target.value)} /><br/><br />
                Address : <textarea name="address" id="address" onChange={(e)=>setAddress(e.target.value)}></textarea><br /><br />
                <button type="submit" value="submit" onClick={submitData}>Submit</button>
            </div>
        </>
    );
}
 
export default DataEntry;