import React, { useEffect, useState, useRef } from "react";
import TextInputField from "./TextInputField";
import MarkdownDisplay from "./MarkdownDisplay";
import NoteInputField from "./NoteInputField";

export default function NewNoteInput(props) {
    const subheading = useRef();

    return( <div className="my-2">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <NoteInputField/>
        <button className="btn submit-btn-secondary my-1">Delete</button>
    </div>)
}