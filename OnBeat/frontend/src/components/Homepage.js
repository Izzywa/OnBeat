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
    </div>
    )
}