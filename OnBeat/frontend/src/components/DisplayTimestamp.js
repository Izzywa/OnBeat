import React, { useState } from "react";
import MarkdownDisplay from "./MarkdownDisplay";
import NewTimestamp from "./NewTimestamp";

export default function DisplayTimestamp(props) {
    const Vid = props.IframeRef.current.internalPlayer

    const [edit, setEdit] = useState(false)

    function seekToTimestamp() {
        const time = parseInt(props.noteList[props.index].content.timestamp)
        Vid.seekTo(time);
    }

    function handleEdit() {
        setEdit(true)
    }

    if (edit) {
        return (
            <>
            <NewTimestamp IframeRef={props.IframeRef} setTimestampInput={props.setTimestampInput} 
            noteList={props.noteList} setNoteList={props.setNoteList}
            edit={edit} setEdit={setEdit} text={props.noteList[props.index].content.text}
            timestamp={props.noteList[props.index].content.timestamp} id={props.id}/>
            </>
        )

    } else {
        return(<>
            <h4 className="timestamp-link" onClick={seekToTimestamp}>
                {new Date (props.noteList[props.index].content.timestamp * 1000).toISOString().slice(11,19)}</h4>
            <MarkdownDisplay markdownText={props.noteList[props.index].content.text} className={"container"} />
            <button className="btn submit-btn mr-1" onClick={handleEdit}>Edit</button>
            </>)
    }
}