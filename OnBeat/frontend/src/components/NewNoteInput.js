import React, { useEffect, useRef, useState } from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";
import { v4 as uuid } from 'uuid'

export default function NewNoteInput(props) {
    const subheading = useRef();
    const content = useRef();

    const [error, setError] = useState(false)

    useEffect(() => {
        if (props.edit) {
            subheading.current.value = props.heading
            content.current.value = props.text
        }
    }, [])

    function handleDeleteNote() {
        props.setInsertNote(false)
    }

    function handleSaveNote() {
        const noteSubheading = subheading.current.value;
        const noteContent = content.current.value;
        let noteObject = {};

        if (noteContent.trim() != "") {
            noteObject = {
                id: (props.edit ? props.id : uuid()),
                type: 'note',
                content: {
                    heading: noteSubheading,
                    text: noteContent
                }
            }
        } else {
            setError(true);
        }


        if (props.edit) {
            const index = props.noteList.findIndex((item) => item.id === props.id)
            let templist = props.noteList
            templist[index] = noteObject
            props.setNoteList(templist)
            props.setEdit(false)

        } else {

            props.setNoteList([...props.noteList, noteObject]);
            props.setInsertNote(false)
        }

    }

    function handleCancelEdit() {
        props.setEdit(false)
    }

    return( <div className="my-1">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <NoteInputField ref={content} setError={setError} error={error}/>
        <button className="btn submit-btn" disabled={error ? true : false} onClick={handleSaveNote}>Save Note</button>
        <button className="btn submit-btn-secondary my-1" onClick={props.edit ? handleCancelEdit : handleDeleteNote}>
            {props.edit ? "Cancel Edit" : "Cancel"}</button>
    </div>)
}