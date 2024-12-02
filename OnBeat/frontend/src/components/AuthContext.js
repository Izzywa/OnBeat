import React, { useState, createContext, useContext, useEffect,} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
 
export const AuthProvider = ({children}) => {

    const [pageName, setPageName] = useState('')

    const nav = useNavigate();

    const login = (user) => {
        localStorage.clear();
        localStorage.setItem('auth', true);
    } 

    const logout = () => {
        fetch('/backend/logout').then(response => {
            if (response.ok) {
                console.log("logout successful")
                nav("/login")
            } else {
                throw new error("Error logging out")
            }
        })
       
        localStorage.clear();
    }


    return (
        <AuthContext.Provider value={{ login, logout, pageName, setPageName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth Error. useAuth should be in AuthProvider");
    }

    return context
}