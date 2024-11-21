import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { Alert } from "@mui/material";
import YoutubeIframe from "./YoutubeIframe";
import DisplayNoteComponent from "./DisplayNoteComponent";
import DisplayTimestamp from "./DisplayTimestamp";
import ExpandMenu from "./ExpandMenu";
import BasicModal from "./BasicModal";

export default function Note(props) {
    const { noteID } = useParams()
    const { setPageName } = useAuth()

    const [edit, setEdit] = useState(false)
    const [noteAvailable, setNoteAvailable] = useState(null)
    const [noteObject, setNoteObject] = useState(null)
    const [youtubeError, setYoutubeError] = useState(false)
    const [viewOnly, setViewOnly] = useState(true)

    const [openModal, setOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState({
        heading: '',
        text: '',
        buttons: null
    })

    const IframeRef = useRef();

    useEffect(() => {
        setPageName('View Note')
        let status;

        fetch(`/backend/view_note/${noteID}`)
        .then(response => {
            status = response.ok
            return response.json()
        })
        .then(result => {
            if (status) {
                setNoteAvailable(true)
                setNoteObject(result)

            } else {
                setNoteAvailable(false)
            }
            
        })
    },[])

    function AvailableNoteDisplay() {
        let videoID;
        if (noteObject.youtubeURL) {
            if (noteObject.youtubeURL.url.startsWith('https://www.youtube.com')) {
                videoID = noteObject.youtubeURL.url.split('v=')[1].split('&')[0]
            } else {
                videoID = noteObject.youtubeURL.url.split('.be/')[1].split('?')[0]
            }
        }

       function DisplayNote({ value, index }) {
            if (value.type === "note") {
                return(
                    <DisplayNoteComponent index={index} id={value.id} 
                    noteList={noteObject.noteList} viewOnly={viewOnly}/>
                )
            } else {
                return(
                    <DisplayTimestamp index={index} id={value.id}
                    noteList={noteObject.noteList} viewOnly={viewOnly} IframeRef={IframeRef}
                    youtubeError={youtubeError} setOpenModal={setOpenModal} setModalMessage={setModalMessage}/>
                )
            }
       }

        return (
            <>
            <h1 className="title-display">{noteObject.note.title}</h1>

            { noteObject.youtubeURL ?
            <YoutubeIframe id={videoID} IframeRef={IframeRef} setYoutubeError={setYoutubeError} viewOnly={viewOnly}/>
            :null }

            {
                noteObject.noteList.length > 0 ?
                noteObject.noteList.map((value, key) => {
                    return(
                        <div key={key}>
                            <DisplayNote value={value} index={key}/>
                        </div>
                    )
                })
                : null
            }
            </>
        )
    }

    return(
    <>
    <NavBar />
    <div className="container view-note-div">
    { noteAvailable ? <AvailableNoteDisplay /> : null }
    { noteAvailable === false ? <Alert severity="error">Note not available</Alert> : null}

        <BasicModal openModal={openModal} setOpenModal={setOpenModal} messageHeading={modalMessage.heading}
        messageText={modalMessage.text} buttons={modalMessage.buttons} />
        <div className="my-1">
            <ExpandMenu viewOnly={viewOnly}/>
        </div>
    </div>
    <footer style={{height: "5em"}}></footer>

    </>
    )
}