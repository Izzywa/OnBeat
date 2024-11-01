import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownDisplay(props) {
    return (
        <div className="col-sm-6 col-12 container">
            <div className="markdown-display">
                <ReactMarkdown children={props.markdwonText} remarkPlugins={[remarkGfm]}/>
                </div>
            </div>
    )
}