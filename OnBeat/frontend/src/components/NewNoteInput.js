import React, { useRef, useState } from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";
import { v4 as uuid } from 'uuid'

export default function NewNoteInput(props) {
    const subheading = useRef();
    const content = useRef();

    const [error, setError] = useState(false)

    function handleDeleteNote() {
        props.setInsertNote(true)
    }

    function handleSaveNote() {
        const noteSubheading = subheading.current.value;
        const noteContent = content.current.value;
        let noteObject = {};

        if (noteContent.trim() != "") {
            noteObject = {
                id: uuid(),
                type: 'note',
                content: {
                    heading: noteSubheading,
                    text: noteContent
                }
            }
        } else {
            setError(true);
        }

        props.setNoteList([...props.noteList, noteObject]);
        props.setInsertNote(false)

    }

    return( <div className="my-2">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <NoteInputField ref={content} setError={setError} error={error}/>
        <button className="btn submit-btn" disabled={error ? true : false} onClick={handleSaveNote}>Save Note</button>
        <button className="btn submit-btn-secondary my-1" onClick={handleDeleteNote}>Delete</button>
    </div>)
}