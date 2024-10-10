import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export default function Homepage(props) {
    const nav = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        fetch('/backend/logout').then(response => {
            if (response.ok) {
                console.log("logout successful")
                localStorage.setItem('test', 'TEST')
                logout();
                nav("/login")
            } else {
                throw new error("Error logging out")
            }
        })
    }

    return(
    <div>
         <h1>HOMEPAGE DISPLAY</h1>
         <button onClick={handleLogout} className="btn btn-warning">Logout</button>
    </div>
    )
}