import React, { useEffect, useRef, useState } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";
import { useAuth } from "./AuthContext";
import NewNoteInput from "./NewNoteInput";
import NewTimestamp from "./NewTimestamp";
import DisplayNoteComponent from "./DisplayNoteComponent";
import DisplayTimestamp from "./DisplayTimestamp";
import BasicModal from "./BasicModal";


export default function CreateNote(props) {
    const { setPageName } = useAuth();
    const IframeRef = useRef();

    useEffect(() => {
        setPageName('Create Note')
    },[])

    const [insertYoutubeLink, setInsertYoutubeLink]  = useState(false)
    const [insertTimestamp, setInsertTimestamp] = useState(false)
    const [insertNote, setInsertNote] = useState(false)
    const [timestampInput, setTimestampInput] = useState(false)
    const [noteList, setNoteList] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    const messageHeading = "Remove Youtube Video?"
    const messageText = "Timestamps will be removed if the Youtube video is removed. Would you like keep the notes from the timestamps?"

    function handleYoutubeBtnClicked() {
        if (insertYoutubeLink === true) {
            const timestampNoteCount = noteList.filter(item => item.type == 'timestamp').length
            if (timestampNoteCount === 0) {
                setInsertYoutubeLink(false)
                setTimestampInput(false)
            } else {
                setOpenModal(true)
            }
        } else {
            setInsertYoutubeLink(true)
        }
    }

    function handleNoteBtnClicked() {
        setInsertNote(true)
    }

    function handleTimestampBtnClicked() {
        setTimestampInput(true)
    }

    function IconStyle(X, Y = "-2.5") {

        return {
             transform: `translateY(${Y}em) translateX(${X}em)`,
        }
    }

    function handleDeleteNote(id) {
        var templist = noteList.filter(item => item.id != id)
        setNoteList(templist)
    }

    function DisplayNote({ value }) {
        const index = noteList.findIndex((item) => item.id === value.id)

        if (value.type === "note") {
            return (
                <>
                <DisplayNoteComponent index={index} id={value.id}
                noteList={noteList} setNoteList={setNoteList}/>
                <button className="btn submit-btn-secondary" onClick={() => {handleDeleteNote(value.id)}}>Delete Note</button>
                </>
            )
        } else {
            return (<>
                <DisplayTimestamp index={index} id={value.id}
                noteList={noteList} setNoteList={setNoteList} setTimestampInput={setTimestampInput}
                IframeRef={IframeRef}/>
                <button className="btn submit-btn-secondary" onClick={() => {handleDeleteNote(value.id)}}>Delete Timestamp</button>
                </>
            )
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
            
            {insertYoutubeLink ? <div className="my-2"><YoutubeLinkInput setInsertTimestamp={setInsertTimestamp} IframeRef={IframeRef}/></div>: null}

            {   noteList.length > 0 ?
                noteList.map((value, key) => {
                    return(
                        <div key={key}>
                        <DisplayNote value={value}/>
                        </div>
                    )
                })
                : null
            }

            {insertNote ? <NewNoteInput setInsertNote={setInsertNote} noteList={noteList} setNoteList={setNoteList}/>: null }
            {timestampInput ? <NewTimestamp IframeRef={IframeRef} setTimestampInput={setTimestampInput} noteList={noteList} setNoteList={setNoteList}/> : null }

            <BasicModal openModal={openModal} setOpenModal={setOpenModal} messageHeading={messageHeading} messageText={messageText} buttons={"removeTimestamps"}/>

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