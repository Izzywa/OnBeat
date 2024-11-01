import React, { useEffect, useState, useRef } from "react";
import TextInputField from "./TextInputField";
import MarkdownDisplay from "./MarkdownDisplay";

export default function NewNoteInput(props) {
    const subheading = useRef();
    const content = useRef();

    const [markdwonText, setMarkdownText] = useState('');
    const [displayTextAsMarkdown, setDisplayTextAsMarkdown] = useState(true)

    function handleTextChange(event) {
        setMarkdownText(content.current.value)
        event.target.style.height = 'auto'
        event.target.style.height = `${event.target.scrollHeight}px`
    }

    return( <div className="my-2">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <div className="row">
            { markdwonText.trim().length != 0 && displayTextAsMarkdown ? <MarkdownDisplay markdwonText={markdwonText} />: null }
            <div className="col-sm-6 col-12">
                <div className="textarea-div">
                <textarea className="form-control" placeholder="Start writing in markdown" id="content input"
            ref={content} onChange={handleTextChange}
            ></textarea>  
                </div>
            </div>
        </div>
    </div>)
}