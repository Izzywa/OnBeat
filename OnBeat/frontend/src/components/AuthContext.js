import React, { useEffect, createContext, useContext,} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
 
export const AuthProvider = ({children}) => {

    const nav = useNavigate();

    const login = (user) => {
        localStorage.clear();
        localStorage.setItem('username', user);
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

    const user = localStorage.getItem('username')
    const isAuth = !!user

    return (
        <AuthContext.Provider value={{ login, logout, isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth Error");
    }

    return context
}