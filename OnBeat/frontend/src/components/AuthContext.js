import React, { Children, createContext, useContext, useState} from "react";

const AuthContext = createContext();
 
export const AuthProvider = ({children}) => {

    const login = (user) => {
        setUsername(user)
        localStorage.clear();
        localStorage.setItem('username', user);
    } 

    const logout = () => {
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