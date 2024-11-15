import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownDisplay(props) {
    return (
        <div className={props.className ? props.className : "col-sm-6 col-12"}>
            <div className="markdown-display">
                <ReactMarkdown children={props.markdownText} remarkPlugins={[remarkGfm]}/>
                </div>
            </div>
    )
}