import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
    const { isAuth } = useAuth();
    console.log(isAuth)

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;