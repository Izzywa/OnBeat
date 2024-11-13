import React, { useEffect, useRef, useState } from "react";
import YoutubeLinkInput from "./YoutubeLinkInput";
import NavBar from "./NavBar";
import ExpandMenu from "./ExpandMenu";
import { useAuth } from "./AuthContext";
import NewNoteInput from "./NewNoteInput";
import NewTimestamp from "./NewTimestamp";
import DisplayNoteComponent from "./DisplayNoteComponent";


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

    const [noteList, setNoteList] = useState([]);

    function handleDeleteTimestamp() {
        console.log('delete timestamp')
    }


    /*
    const [list, setList] = useState([
        {
            id: 'key',
            type: 'note/timestamp',
            content: {
                heading: 'if note',
                timestamp: 'if timestamp',
                text: 'both'
            }
        }
    ])

    function ExampleRender(props) {
        return(<>
            <h1>Example {props.x}</h1>
            <button className="btn submit-btn-secondary" onClick={() => {deleteX(props.x)}}>delete</button>
            </>
        )
    }
    const [x, setX] = useState([])
    function handleX() {
        setX( x => [...x, x + 1])
    }
    function deleteX(value) {
        var y = x.filter(item => item != value);
        setX(y)
    }

    {
                x.map((value, key) => {
                    return(
                        <div key={key} id={key}>
                            <ExampleRender x={value} key={key}/>
                        </div>
                    )
                })
            }
            <button className="btn submit-btn" onClick={handleX}>click</button>
        */

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
            return (
                <h1>none</h1>
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
            {timestampInput ? <NewTimestamp IframeRef={IframeRef} handleDeleteTimestamp={handleDeleteTimestamp}/> : null }

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