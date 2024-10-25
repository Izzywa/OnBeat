import React, { useEffect, useState } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";
import { useAuth } from "./AuthContext";


export default function CreateNote(props) {
    const { setPageName } = useAuth();

    useEffect(() => {
        setPageName('Create Note')
    })

    const [insertYoutubeLink, setInsertYoutubeLink]  = useState(false)
    const [insertTimestamp, setInsertTimestamp] = useState(false)

    function handleYoutubeBtnClicked() {
        setInsertYoutubeLink(!insertYoutubeLink)
    }

    function handleNoteBtnClicked() {
        console.log('Note btn')
    }

    function handleTimestampBtnClicked() {
        console.log('Timestamp btn')
    }

    function IconStyle(X) {

        return {
             transform: `translateY(-2.5em) translateX(${X}em)`
        }
    }

    return(
        <>
        <NavBar />
        <div className="container mt-2">
        <div className="input-group input-group-lg">
        <span className="input-group-text" id="title">Title</span>
        <input type="text" className="form-control" aria-label="Title Input" aria-describedby="title"></input>
        </div>
        {insertYoutubeLink ? <YoutubeLinkInput setInsertTimestamp={setInsertTimestamp}/>: null}
        <div className="my-1">
            <ExpandMenu 
            insertYoutubeLink={insertYoutubeLink}
            handleYoutubeBtnClicked={handleYoutubeBtnClicked} 
            handleNoteBtnClicked={handleNoteBtnClicked}
            handleTimestampBtnClicked={handleTimestampBtnClicked}
            NoteIconStyle={IconStyle("2.5")}
            YouTubeIconStyle={IconStyle("5")} TimeIconStyle={IconStyle("7.5")}/>
        </div>
        </div>
        </>
    )
}