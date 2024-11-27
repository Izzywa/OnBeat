import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { Alert } from "@mui/material";
import YoutubeIframe from "./YoutubeIframe";
import DisplayNoteComponent from "./DisplayNoteComponent";
import DisplayTimestamp from "./DisplayTimestamp";
import ExpandMenu from "./ExpandMenu";
import BasicModal from "./BasicModal";
import csrftoken from "./CSRFCookie";
import getVideoID from "./getVideoID";

export default function Note(props) {
    const { noteID } = useParams()
    const { setPageName } = useAuth()

    const [noteAvailable, setNoteAvailable] = useState(null)
    const [noteObject, setNoteObject] = useState(null)

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

    
   function AvailableNote(props) {
    const [openModal, setOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState({
        heading: '',
        text: '',
        buttons: null
    })

    const [youtubeError, setYoutubeError] = useState(false)
    const [viewOnly, setViewOnly] = useState(true)

    const [edit, setEdit] = useState(false);

    const IframeRef = useRef();

    function handleDeleteBtnClicked() {
        setOpenModal(true)
        setModalMessage({
            heading: 'Delete note.',
            text: 'Are you certain?',
            buttons: 'deleteNote'
        })
    }

    function handleDeleteNote() {
        setOpenModal(false)

        const requestOptions = {
            method: ('POST'),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken()
                },
                mode: 'same-origin'
        }

        fetch(`/backend/delete_note/${noteID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })

        window.location.href = '/'
    }

    function NoteListDisplay(props) {
        if (props.value.type === 'note') {
            return(
                <DisplayNoteComponent index={props.index} id={props.value.id} 
                    noteList={props.noteObject.noteList} viewOnly={props.viewOnly}/>
            )
        } else {
            return(
                <DisplayTimestamp index={props.index} id={props.value.id}
                    noteList={props.noteObject.noteList} viewOnly={props.viewOnly} IframeRef={props.IframeRef}
                    youtubeError={props.youtubeError} 
                    setOpenModal={props.setOpenModal} setModalMessage={props.setModalMessage}/>
            )
        }
    }

    return (<div>
        <h3 className="title-display">{props.noteObject.note.title}</h3>

        {props.noteObject.youtubeURL ? 
            <YoutubeIframe id={getVideoID(noteObject.youtubeURL.url)} IframeRef={IframeRef}
            viewOnly={viewOnly} setYoutubeError={setYoutubeError} />
         : null}

        {props.noteObject.noteList.length > 0 ?
        props.noteObject.noteList.map((value, index) => {
            return(
                <div key={index}>
                    <NoteListDisplay value={value} index={index} 
                    noteObject={props.noteObject} viewOnly={viewOnly}
                    IframeRef={IframeRef} youtubeError={youtubeError}
                    setOpenModal={setOpenModal} setModalMessage={setModalMessage}/>
                </div>
            )
        })
        : null}

        <BasicModal openModal={openModal} setOpenModal={setOpenModal}
        messageHeading={modalMessage.heading} messageText={modalMessage.text}
        buttons={modalMessage.buttons} handleDeleteNote={handleDeleteNote}/>

        <ExpandMenu viewOnly={viewOnly} handleDeleteBtnClicked={handleDeleteBtnClicked}/>
        </div>
    )
   }

    return(
    <>
    <NavBar />
    <div className="container view-note-div">
    { noteAvailable ? 
        <AvailableNote noteObject={noteObject}/>
     : null }


    { noteAvailable === false ? <Alert severity="error">Note not available</Alert> : null}
    </div>
    <footer style={{height: "5em"}}></footer>

    </>
    )
}