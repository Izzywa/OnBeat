import React, { useEffect, useState } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";
import { useAuth } from "./AuthContext";
import NewNoteInput from "./NewNoteInput";
import NewTimestamp from "./NewTimestamp";


export default function CreateNote(props) {
    const { setPageName } = useAuth();

    useEffect(() => {
        setPageName('Create Note')
    })

    const [insertYoutubeLink, setInsertYoutubeLink]  = useState(false)
    const [insertTimestamp, setInsertTimestamp] = useState(false)
    const [insertNote, setInsertNote] = useState(false)
    const [timestampInput, setTimestampInput] = useState(false)

    function handleYoutubeBtnClicked() {
        if (insertYoutubeLink === true) {
            setInsertTimestamp(false)
        }
        setInsertYoutubeLink(!insertYoutubeLink)
    }

    function handleNoteBtnClicked() {
        setInsertNote(true)
    }

    function handleTimestampBtnClicked() {
        setTimestampInput(true)
    }

    function IconStyle(X, Y = "-2.5", Z = "1") {

        return {
             transform: `translateY(${Y}em) translateX(${X}em)`,
        }
    }

    return(
        <>
        <NavBar />
        <div className="container mt-2 mb-3">
            <div className="input-group input-group-lg my-3">
                <span className="input-group-text" id="title">Title</span>
                <input type="text" className="form-control" aria-label="Title Input" aria-describedby="title"></input>
            </div>
            
            {insertYoutubeLink ? <div className="my-2"><YoutubeLinkInput setInsertTimestamp={setInsertTimestamp}/></div>: null}

            {insertNote ? <NewNoteInput setInsertNote={setInsertNote}/>: null }
            {timestampInput ? <NewTimestamp/> : null }

            <div className="my-1">
                <ExpandMenu 
                insertYoutubeLink={insertYoutubeLink}
                handleYoutubeBtnClicked={handleYoutubeBtnClicked} 
                handleNoteBtnClicked={handleNoteBtnClicked}
                insertTimestamp={insertTimestamp}
                handleTimestampBtnClicked={handleTimestampBtnClicked}
                NoteIconStyle={IconStyle("2.5")}
                YouTubeIconStyle={IconStyle("5")} 
                TimeIconStyle={IconStyle("7.5")}/>
            </div>
        </div>
        <footer style={{height: "5em"}}></footer>
        </>
    )
}