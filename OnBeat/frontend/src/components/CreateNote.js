import React, { useEffect, useState, useRef } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";


export default function CreateNote(props) {

  /*   useEffect(() => {
        document.addEventListener('selectionchange', () => {
            const selection = document.getSelection()
            const selectionText = selection.toString();
            if (selection.isCollapsed == false) {
                var startIndex = selection.anchorOffset
                var endIndex = selection.focusOffset
                var startID = selection.anchorNode.parentElement.id
                var endID = selection.focusNode.parentElement.id
            }

            
        })
     },[]) */

    return(
        <>
        <NavBar />
         <div id='1' className="container">
        <h1>CREATE NOTE COMPONENT</h1>
        <YoutubeLinkInput />
    </div>
        </>
    )
}