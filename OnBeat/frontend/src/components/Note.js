import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import YoutubeIframe from "./YoutubeIframe";
import DisplayNoteComponent from "./DisplayNoteComponent";
import DisplayTimestamp from "./DisplayTimestamp";
import ExpandMenu from "./ExpandMenu";
import BasicModal from "./BasicModal";
import csrftoken from "./CSRFCookie";
import getVideoID from "./getVideoID";
import CreateNote from "./CreateNote";

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

    const [edit, setEdit] = useState(false);
    
   function AvailableNote(props) {
    const [openModal, setOpenModal] = useState(false)
    const [modalMessage, setModalMessage] = useState({
        heading: '',
        text: '',
        buttons: null
    })

    const [youtubeError, setYoutubeError] = useState(false)
    const viewOnly = true;

    const IframeRef = useRef();
    const [onBeat, setOnBeat] = useState(false);

    const handleDeleteBtnClicked = useCallback(() => {
        setOpenModal(true)
        setModalMessage({
            heading: 'Delete note.',
            text: 'Are you certain?',
            buttons: 'deleteNote'
        })
    },[openModal])


    const handleEditBtnClicked = useCallback(() => {
        props.setEdit(true)
    },[edit])

    const handleDeleteNote = useCallback(() => {
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
    }, [openModal])

    const timestampRefs = useRef([])
    const timestampList = props.noteObject.noteList.filter(item => item.type == 'timestamp')

    function NoteListDisplay(props) {
        if (props.value.type === 'note') {
            return(
                <DisplayNoteComponent index={props.index} id={props.value.id} 
                    noteList={props.noteObject.noteList} viewOnly={props.viewOnly}/>
            )
        } else {
            return(
                <div className="timestamp-div" 
                ref={el => timestampRefs.current[timestampList.indexOf(props.value)] = el}>
                <DisplayTimestamp index={props.index} id={props.value.id}
                    onBeat={onBeat}
                    noteList={props.noteObject.noteList} viewOnly={props.viewOnly} IframeRef={props.IframeRef}
                    youtubeError={props.youtubeError} 
                    setOpenModal={props.setOpenModal} setModalMessage={props.setModalMessage}/>
                    </div>
            )
        }
    }

    useEffect(() => {
        
        if (props.noteObject.youtubeURL && onBeat && !edit) {
            let timestampTimeList = []
            timestampList.map((item,index) => {
                timestampTimeList[index] = item.content.timestamp
            })
                const interval = setInterval(() => {
                    let playerState;
                    IframeRef.current.internalPlayer.getPlayerState().then(result => playerState=result)
                    IframeRef.current.internalPlayer.getCurrentTime()
                    .then(result => {
                        if (timestampTimeList.includes(Math.round(result)) && playerState == 1) {
                            timestampRefs.current[timestampTimeList.indexOf(Math.round(result))]
                            .scrollIntoView( {behavior: 'smooth'} )
                        }
                    })
                }, 1000)

                return () => clearInterval(interval);
            
        }
    }, [props.noteObject, onBeat])

    const [bookmarked, setBookmarked] = useState(false)
    useEffect(() => {
        const requestOptions = {
            method: ('POST'),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken()
                },
                mode: 'same-origin'
        }

        let okStatus;
        fetch(`/backend/bookmark/${props.noteObject.note.id}`, requestOptions)
        .then(response => {
            okStatus = response.ok
            return response.json()
        }).then(result => {
            if (okStatus) {
                setBookmarked(result)
            }
        }).catch(error => {
            console.log(error)
        })
    },[])
    const handleBookmark = useCallback(() => {
        const requestOptions = {
            method: ('PUT'),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken()
                },
                mode: 'same-origin'
        }
        let okStatus;
        fetch(`/backend/bookmark/${props.noteObject.note.id}`, requestOptions)
        .then(response => {
            okStatus = response.ok
            return response.json()
        }).then(result => {
            if (okStatus) {
                setBookmarked(result)
            }
        }).catch(error => {
            console.log(error)
        })
    },[bookmarked])

    function handleOnBeat() {
        if (onBeat) {
            setOnBeat(false)
        } else {
            setOnBeat(true)
        }
    }

    if (edit) {
        return (
            <CreateNote edit={props.edit} noteObject={props.noteObject}/>
        )

    } else {
        return (<div className="container">
            <h3 className="title-display mt-2">{props.noteObject.note.title}</h3>

            {props.noteObject.youtubeURL ? 
            <div style={{
    
                }}>
                <YoutubeIframe id={getVideoID(noteObject.youtubeURL.url)} IframeRef={IframeRef}
                viewOnly={viewOnly} setYoutubeError={setYoutubeError} />
                </div>
            : null}

                <div className="notelist-div" 
                style={ props.noteObject.youtubeURL ? 
                    {
                        overflow: 'scroll',
                        maxHeight: '50vh'
                    }
                    : null
                }>
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
            </div>

            <BasicModal openModal={openModal} setOpenModal={setOpenModal}
            messageHeading={modalMessage.heading} messageText={modalMessage.text}
            buttons={modalMessage.buttons} handleDeleteNote={handleDeleteNote}/>

            <ExpandMenu viewOnly={viewOnly} handleDeleteBtnClicked={handleDeleteBtnClicked}
            handleEditBtnClicked={handleEditBtnClicked} bookmarked={bookmarked} handleBookmark={handleBookmark}
            handleOnBeat={!youtubeError && !!props.noteObject.youtubeURL ? handleOnBeat : null} onBeat={onBeat}/>
            </div>
        )
    }
   }

    return(
    <>
    <NavBar />
    <div className="view-note-div">
    { noteAvailable ? 
        <AvailableNote noteObject={noteObject} edit={edit} setEdit={setEdit}/>
     : null }


    { noteAvailable === false ? <div className="alert-no-notes my-3"><h6>No Notes</h6></div> : null}
    </div>
    <footer style={{height: "5em"}}></footer>

    </>
    )
}