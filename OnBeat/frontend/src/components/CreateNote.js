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
import csrftoken from "./CSRFCookie";


export default function CreateNote(props) {
    const { setPageName } = useAuth();
    const IframeRef = useRef();
    const titleRef = useRef();

    useEffect(() => {
        setPageName('Create Note')
    },[])

    const [insertYoutubeLink, setInsertYoutubeLink]  = useState(false)
    const [insertTimestamp, setInsertTimestamp] = useState(false)
    const [insertNote, setInsertNote] = useState(false)
    const [timestampInput, setTimestampInput] = useState(false)
    const [noteList, setNoteList] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const [youtubeError, setYoutubeError] = useState(false);

    const [modalMessage, setModalMessage] = useState({
        heading: '',
        text: '',
        buttons: null,
    })

    const [titleError, setTitleError] = useState({
        error: false,
        message: ''
    })

    const [youtubeUrl, setYoutubeUrl] = useState(null)


    function handleYoutubeBtnClicked() {
        if (insertYoutubeLink === true) {
            const timestampNoteCount = noteList.filter(item => item.type == 'timestamp').length
            setModalMessage({
                heading: "Remove Youtube Video?",
                text: "Timestamps will be removed if the Youtube Video is removed. Are you certain?",
                buttons: "removeTimestamps"
            })

            if (timestampNoteCount === 0) {
                removeYoutubeVideo()
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

    function removeYoutubeVideo() {
        setInsertYoutubeLink(false)
        setTimestampInput(false)
        setInsertTimestamp(false)
        setOpenModal(false)
        setYoutubeUrl(null)
    }

    function handleKeepTimestampsNotes() {

        let templist = noteList;
        let newObject = {}

        for (let i = 0; i < templist.length; i++) {
            if (templist[i].type == 'timestamp') {
                newObject = {
                    id: templist[i].id,
                    type: 'note',
                    content: {
                        heading: '',
                        text: templist[i].content.text
                    }
                }
                templist[i] = newObject
            }
        }

        setNoteList(templist)
        removeYoutubeVideo()
    }

    function handleDeleteAllTimestamps() {

        var templist = noteList.filter(item => item.type != "timestamp")
        setNoteList(templist)

        removeYoutubeVideo()
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
                IframeRef={IframeRef} youtubeError={youtubeError}
                setOpenModal={setOpenModal} setModalMessage={setModalMessage}/>
                <button className="btn submit-btn-secondary" onClick={() => {handleDeleteNote(value.id)}}>Delete Timestamp</button>
                </>
            )
        }
    }

    function handleSaveBtnClicked() {
        const title = titleRef.current.value.trim()
        let noteContentObject = {}

        if (title.length <= 0) {
            setTitleError({
                error: true,
                message: "Please fill in the title of the note."
            })
        } else if (title.length > 100) {
            setTitleError({
                error: true,
                message: "Title must not be more than 100 characters."
            })
        } else {
            setTitleError({
                error: false,
                message: ''
            })
            noteContentObject = {
                title: title,
                youtubeUrl: youtubeUrl,
                noteList: noteList
            }

            const requestOptions = {
                method: ('POST'),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken()
                },
                mode: 'same-origin',
                body: JSON.stringify(noteContentObject)
            }

            let status;

            fetch('backend/create_note', requestOptions)
            .then(response => {
                status = response.status
                if (response.ok) {
                    return response.json()
                }
            }).then(result => {
               if (status === 200) {
                    console.log(result.message)
               } else {
                    setOpenModal(true)
                    setModalMessage(result)
               }
            }).catch(error => {
                console.log(error)
            })
            
        }

    }

    return(
        <>
        <NavBar />
        <div className="container mt-2 mb-3">
            <div className="input-group input-group-lg my-3">
                <span className="input-group-text" id="title">Title</span>
                <input type="text" className={titleError.error ? "form-control title-input is-invalid" :"form-control title-input"}  
                aria-label="Title Input" aria-describedby="title"
                ref={titleRef}></input>
                <div className="invalid-feedback">{titleError.message}</div>
            </div>
            
            {insertYoutubeLink ? 
            <div className="my-2"><YoutubeLinkInput setInsertTimestamp={setInsertTimestamp} IframeRef={IframeRef}
            setYoutubeError={setYoutubeError} setYoutubeUrl={setYoutubeUrl}/></div>
            : null}

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

            <BasicModal openModal={openModal} setOpenModal={setOpenModal} 
            messageHeading={modalMessage.heading} messageText={modalMessage.text} 
            buttons={modalMessage.buttons}
            handleDeleteAllTimestamps={handleDeleteAllTimestamps}
            handleKeepTimestampsNotes={handleKeepTimestampsNotes}/>

            <div className="my-1">
                <ExpandMenu 
                insertYoutubeLink={insertYoutubeLink}
                handleYoutubeBtnClicked={handleYoutubeBtnClicked} 
                handleNoteBtnClicked={handleNoteBtnClicked}
                insertTimestamp={insertTimestamp}
                handleTimestampBtnClicked={handleTimestampBtnClicked}
                handleSaveBtnClicked={handleSaveBtnClicked}
                NoteIconStyle={IconStyle("2.5")}
                YouTubeIconStyle={IconStyle("5")} 
                TimeIconStyle={IconStyle("7.5")}/>
            </div>
        </div>
        <footer style={{height: "5em"}}></footer>
        </>
    )
}