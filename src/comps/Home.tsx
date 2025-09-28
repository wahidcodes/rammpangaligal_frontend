//@ts-nocheck
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <>
            <ProtectedRoute>
                <div>
                    <a href="/modifyData">Data Entry</a>
                </div>
                <div>
                    <a href="/viewData">View Data</a>
                </div>
                <div>
                    <button onClick={logOut}>Log Out</button>
                </div>
                <div>
                    <a href="/register">Register</a>
                </div>
            </ProtectedRoute>
        </>
    )
}

export default Home;