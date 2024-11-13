import React, { forwardRef, useRef, useState } from "react";
import MarkdownDisplay from "./MarkdownDisplay";

const NoteInputField = forwardRef(function NoteInputField(props, ref) {
    const [displayTextAsMarkdown, setDisplayTextAsMarkdown] = useState(true)

    function handleMarkdownDisplayToggle() {
        setDisplayTextAsMarkdown(!displayTextAsMarkdown)
    }
    

    const [markdwonText, setMarkdownText] = useState('');

    function handleTextChange(event) {
        setMarkdownText(ref.current.value)

        if (ref.current.value.trim() == "") {
            props.setError(true);
        } else {
            props.setError(false)
        }

        event.target.style.height = 'auto'
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    return (<>
        <div className="row">
            { markdwonText.trim().length != 0 && displayTextAsMarkdown ? <MarkdownDisplay markdwonText={markdwonText} />: null }
            <div className={displayTextAsMarkdown && markdwonText.trim().length != 0 ? "col-sm-6 col-12": "col-12"}>
                <div className="textarea-div">
                <textarea className={props.error ? "form-control is-invalid" : "form-control"} placeholder="Start writing in markdown" id="content input"
            ref={ref} onChange={handleTextChange}
            ></textarea> 
            <div className="invalid-feedback">Note must not be left empty.</div> 
                </div>
            </div>
        </div>
        <button className="btn submit-btn mr-1 my-1" onClick={handleMarkdownDisplayToggle}>{ displayTextAsMarkdown ? "Hide" : "Show"} Markdown Display</button>
        </>
    )
});

export default NoteInputField