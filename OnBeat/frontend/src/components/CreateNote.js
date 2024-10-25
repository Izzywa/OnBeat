import React, { useEffect, useState, useRef } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";


export default function CreateNote(props) {

    const [insertYoutubeLink, setInsertYoutubeLink]  = useState(false)

    function handleYoutubeBtnClicked() {
       console.log('youtube btn clicked')
    }

    function IconStyle(X) {

        return {
             transform: `translateY(-2.5em) translateX(${X}em)`
        }
    }

    return(
        <>
        <NavBar />
         <div id='1' className="container">
        <YoutubeLinkInput />
        </div>
        <div className="container my-1">
            <ExpandMenu handleYoutubeBtnClicked={handleYoutubeBtnClicked} 
             NoteIconStyle={IconStyle("2.5")}
             YouTubeIconStyle={IconStyle("5")} TimeIconStyle={IconStyle("7.5")}/>
        </div>
        </>
    )
}