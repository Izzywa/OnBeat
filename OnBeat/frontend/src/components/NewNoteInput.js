import React, { useEffect, useState, useRef } from "react";
import TextInputField from "./TextInputField";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function NewNoteInput(props) {
    const subheading = useRef();
    const content = useRef();
    const markdownRef = useRef();

    const [markdwonText, setMarkdownText] = useState('');

    function handleTextChange(event) {
        setMarkdownText(content.current.value)
        event.target.style.height = 'auto'
        event.target.style.height = `${event.target.scrollHeight}px`

    }

    const text = `Just a link: https://reactjs.com.`

    return( <div className="my-2">
        <TextInputField field="" type="text" placeholder="Insert Heading" ref={subheading} />
        <div className="row">
            <div className="col-sm-6 col-12 markdown-display container" ref={markdownRef}>
            <ReactMarkdown children={markdwonText} remarkPlugins={[remarkGfm]}/>
            </div>
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