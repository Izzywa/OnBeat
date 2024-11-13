import React from "react";
import MarkdownDisplay from "./MarkdownDisplay";

export default function DisplayTimestamp(props) {

    return(<>
    <h4 className="timestamp-link">
        {new Date (props.noteList[props.index].content.timestamp * 1000).toISOString().slice(11,19)}</h4>
    <MarkdownDisplay markdownText={props.noteList[props.index].content.text} className={"container"} />
    </>)
}