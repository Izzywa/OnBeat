import React, { useState } from "react";
import MarkdownDisplay from "./MarkdownDisplay";
import NewNoteInput from "./NewNoteInput";

export default function DisplayNoteComponent(props) {
    const [edit, setEdit] = useState(false)

    function handleEdit() {
        setEdit(true)
    }

    if (edit) {
        return (
            <>
            <NewNoteInput edit={edit} setEdit={setEdit} 
            heading={props.noteList[props.index].content.heading} text={props.noteList[props.index].content.text} 
            noteList={props.noteList} setNoteList={props.setNoteList} id={props.id}/>
            </>
        )

    } else {
        return (<>
            <h3 className="note-subheading">{props.noteList[props.index].content.heading}</h3>
            <MarkdownDisplay markdownText={props.noteList[props.index].content.text} className={"col-12"}/>
            <button className="btn submit-btn mr-1" onClick={handleEdit}>Edit</button>
        </>)
    }
}