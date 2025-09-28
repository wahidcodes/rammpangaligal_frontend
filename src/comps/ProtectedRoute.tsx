//@ts-nocheck

import {useEffect, useState} from 'react';
import api from '../utils/api.js';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../utils/constants';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

type StrictCompProps = { children: string }
const ProtectedRoute : React.FC<StrictCompProps> = ({children}) => {

    const [authorized, setAuthorized] : boolean = useState(null);
    
    useEffect(()=>{
        auth().catch((err)=>{
            console.log(err);
        })
    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = api.post("/api/token/refresh", {
                refresh: refreshToken,
            });
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthorized(true);
            }
            else{
                setAuthorized(false)
            }
        }
        catch(err){
            console.log(err);
            setAuthorized(false)
        }
    }

    const auth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(!accessToken){
            console.log("No tkoen found in localStorage")
            setAuthorized(false);
            return;
        }
        const decodeToken = jwtDecode(accessToken)
        const exp = decodeToken.exp;
        const now = Date.now() / 1000;
        if(exp < now){
            console.log("Token Expired. Getting new access token...")
            refreshToken();
        }
        else{
            setAuthorized(true);
            console.log("you are authorized")
        }
    }

    if(authorized === null){
        console.log("Loading...")
        return <>'Loading...'</>;
    }

    return authorized ? children : <Navigate to='/login' />;
}
 
export default ProtectedRoute;