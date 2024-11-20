import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import csrftoken from "./CSRFCookie";

export default function Note(props) {
    const { noteID } = useParams()
    const { setPageName } = useAuth()
    useEffect(() => {
        setPageName('')

        fetch(`/backend/view_note/${noteID}`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
        })
    },[])

    const [edit, setEdit] = useState(false)

    return(
    <>
    <NavBar />
        <h1>Note</h1>
        <p>{noteID}</p>
    </>
    )
}