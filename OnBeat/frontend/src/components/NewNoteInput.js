import React, { useRef } from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";

export default function NewNoteInput(props) {
    const subheading = useRef();
    const content = useRef();

    function handleDeleteNote() {
        props.setInsertNote(false)
    }

    return( <div className="my-2">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <NoteInputField ref={content}/>
        <button className="btn submit-btn-secondary my-1" onClick={handleDeleteNote}>Delete</button>
    </div>)
}