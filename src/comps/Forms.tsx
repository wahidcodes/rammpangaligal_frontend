//@ts-nocheck

import { useState } from "react";
import api from "../utils/api";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../utils/constants';

const Forms = ({formType}) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {

        if(formType == "Register"){
            const userObject = {username, email, password};
            console.log(JSON.stringify(userObject))
            try{
                const res = await api.post("/api/user/register/", JSON.stringify(userObject),{
                    headers: {
                        "Content-Type" : 'application/json'
                    }
                })
                console.log(res.status)
                setLoading(true);
                if(res.status === 200 || res.status === 201){
                    setLoading(false);
                    alert("Account created")
                    navigate('/login')
                }

            } catch (err){
                //console.log("FetchAPI error:", err)
                if(err.response.data.username[0]){
                    alert("username already exist")
                }
            }

        }

        else if(formType=="Login"){
            const userObject = {username, password};
            try{
                const res = await api.post("/api/token/", JSON.stringify(userObject),{
                    headers: {
                        "Content-Type" : 'application/json'
                    }
                })
                console.log(res.status)
                setLoading(true);
                if(res.status === 200 || res.status === 201){
                    setLoading(false);
                    console.log("Logged in");
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                    navigate('/');
                }
            }
            catch(err){
                console.log("Unable to login: ", err)
                alert("Unable to login");
            }
        }

    }

    return (
        <>
            {loading && "loading..."}
            <h1>Forms page</h1><br />
            Username: <input type="text" onChange={(e)=>setUsername(e.target.value)} /><br />
            {formType == "Register" && <>Email: <input type="email" onChange={(e)=>setEmail(e.target.value)}/><br/></>}
            Password: <input type="text" onChange={(e)=>setPassword(e.target.value)} /><br />
            <button onClick={()=>handleSubmit()}>Submit</button>

            <br /><br />
        </>
    );
}
 
export default Forms;