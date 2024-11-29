import React, { useEffect, useState} from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import NoteCard from "./NoteCard";

export default function Homepage(props) {
    const { setPageName } = useAuth();
    const [lastNotes, setLastNotes] = useState({
        lastCreated: null,
        lastModified: null
    })

    useEffect(() => {
        setPageName('Homepage')

        fetch('/backend/homepage')
        .then(response => response.json())
        .then(result => {
            setLastNotes(result.lastNotes)
        }).catch(error => {
            console.log(error)
        })
    })
    
    return(
    <div>
        <NavBar/>
        <div className="container">
            <h3>Last Created</h3>
            { lastNotes.lastCreated ? <NoteCard value={lastNotes.lastCreated}/>
            : "no item"}
        </div>
        <div className="container">
            <h3>Last Modified</h3>
            { lastNotes.lastModified ? <NoteCard value={lastNotes.lastModified}/>
            : "no item"}
        </div>
        <div className="container">
            <h1>bookmarks</h1>
        </div>
    </div>
    )
}