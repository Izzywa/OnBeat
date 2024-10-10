import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import csrftoken from "./CSRFCookie";

const PrivateRoutes = () => {
    const { logout } = useAuth()
    const username = localStorage.getItem('username')
    
    const requestOptions = {
        method: ('POST'),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken()
            },
            mode: 'same-origin',
            body: JSON.stringify({
                username: username
            })
    }
    useEffect(() => {
        fetch('/backend/current-user', requestOptions).then(response => {
            if (!response.ok) {
                logout()
            }
        })
    })

    const isAuth = !!username
    console.log('Private route run')

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;