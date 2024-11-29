import React, { useEffect} from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";

export default function Homepage(props) {
    const { setPageName } = useAuth();

    useEffect(() => {
        setPageName('Homepage')
    })
    
    return(
    <div>
        <NavBar/>
        <div className="container">
            <h1>last modified</h1>
        </div>
        <div className="container">
            <h1>last created</h1>
        </div>
        <div className="container">
            <h1>bookmarks</h1>
        </div>
    </div>
    )
}