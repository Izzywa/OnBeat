import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
import { AuthProvider } from "./AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import { useAuth } from "./AuthContext";

export default function App(props) {
    return(
        <AuthProvider>
            <Routes>
                <Route element={<PrivateRoutes />}>
                {" "}
                <Route path="/" element={<Homepage />}/>
                </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </AuthProvider>
    )
}