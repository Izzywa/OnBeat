import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { Alert } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";

export default function Note(props) {
    const { noteID } = useParams()
    const { setPageName } = useAuth()

    const [noteAvailable, setNoteAvailable] = useState(null)
    const [noteObject, setNoteObject] = useState(null)

    useEffect(() => {
        setPageName('')
        let status;

        fetch(`/backend/view_note/${noteID}`)
        .then(response => {
            status = response.ok
            return response.json()
        })
        .then(result => {
            if (status) {
                setNoteAvailable(true)
                setNoteObject(result)
            } else {
                setNoteAvailable(false)
            }
            
        })
    },[])

    const [edit, setEdit] = useState(false)

    function NoteDisplay() {
        console.log(noteObject)
        return (
            <>
            <h1 className="title-display">{noteObject.note.title}</h1>
            </>
        )
    }

    return(
    <>
    <NavBar />
    <div className="container view-note-div">
    { noteAvailable ? <NoteDisplay /> : null }
    { noteAvailable === false ? <Alert severity="error">Note not available</Alert> : null}
    </div>

    </>
    )
}