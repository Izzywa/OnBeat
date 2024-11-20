import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
import { AuthProvider } from "./AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import CreateNote from "./CreateNote";
import Note from "./Note";

export default function App(props) {
    return(
        <AuthProvider>
            <Routes>
                <Route element={<PrivateRoutes />}>
                {" "}
                <Route path="/" element={<Homepage />}/>
                <Route path="/create-note" element={<CreateNote />}/>
                <Route path="/note/:noteID" element={<Note />}/>
                </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </AuthProvider>
    )
}