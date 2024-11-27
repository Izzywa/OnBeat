import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";

export default function Search(props) {
    const { setPageName } = useAuth();

    useEffect(() => {
        setPageName("Search")
    }, [])
    return(
        <>
        <NavBar />
        <div className="container">
            <div>
                <h1>search input</h1>
                <p>search filter</p>
            </div>
            <div>
                <p>search result</p>
            </div>
        </div>
        </>
    )
}