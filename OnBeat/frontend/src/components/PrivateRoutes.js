import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import csrftoken from "./CSRFCookie";

const PrivateRoutes = () => {
    const { logout, login } = useAuth()
    
    useEffect(() => {
        fetch('/backend/current-user').then(response => {
            if (!response.ok) {
                logout()

            } else {
                login()
            }
        })
    },[])

    const isAuth = localStorage.getItem('auth')

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;