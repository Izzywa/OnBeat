import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import csrftoken from "./CSRFCookie";

const PrivateRoutes = () => {
    const { logout, login } = useAuth()

    const requestOptions = {
        method: ('POST'),
        headers: {
            'X-CSRFToken': csrftoken()
        },
        mode: 'same-origin'
    }
    
    let okStatus;
    useEffect(() => {
        fetch('/backend/current-user', requestOptions).then(response => {
            if (!response.ok) {
                okStatus = false

            } else {
                okStatus = true
            }
            return response.json()
        }).then(result => {
            if (okStatus) {
                login()

            } else {
                logout()
            }
        })
    })

    let isAuth = localStorage.getItem('auth')

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;