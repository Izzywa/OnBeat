import React, {useRef, useEffect, useState} from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";
import { v4 as uuid } from "uuid";


export default function NewTimestamp(props) {
    const SecRef = useRef();
    const MinRef = useRef();
    const HourRef = useRef();

    const TimestampNote = useRef()
    const Vid = props.IframeRef.current.internalPlayer
    let [duration, setDuration] = useState(null);

    const [noteError, setNoteError] = useState(false);

    const [error, setError] = useState({
        hour: false,
        min: false,
        sec: false
    })

    useEffect(() => {
        let currentTime = null;
        Vid.getDuration().then(response => setDuration(response))
        Vid.getCurrentTime().then(response => {
            currentTime = new Date (response * 1000).toISOString().slice(11,19).split(':')
            HourRef.current.value = parseInt(currentTime[0])
            MinRef.current.value = parseInt(currentTime[1])
            SecRef.current.value = parseInt(currentTime[2])
        })
    },[])

    function validateTimestamp(hour, min, sec) { 
        setError({
            hour: !(hour >= 0),
            min: !(min >= 0),
            sec: !(sec >= 0)
        })

        let totalSec = hour * 3600 + min * 60 + sec

        if (totalSec > duration) {
            setError({
                hour: true,
                min: true,
                sec: true
            })
        }

        if (hour >= 0 && min >= 0 && sec >= 0 && totalSec <= duration) {
            return true
        } else {
            return false
        }
    }


    function handleInsertTimestamp() {
        const text = TimestampNote.current.value;
        const hour = HourRef.current.value != "" ? parseFloat(HourRef.current.value) : 0;
        const min = MinRef.current.value != "" ? parseFloat(MinRef.current.value) : 0;
        const sec = SecRef.current.value != "" ? parseFloat(SecRef.current.value) : 0;
        let timestampObject = {};

        const validTimestamp = validateTimestamp(hour, min, sec)

        if (text.trim() != "") {
            setNoteError(false)
        } else {
            setNoteError(true)
        }

        if (validTimestamp && text.trim() != "") {
            console.log('valid timestamp')
            timestampObject = {
                id: (props.edit ? props.id : uuid()),
                type: 'timestamp',
                content: {
                    timestamp: hour * 3600 + min * 60 + sec,
                    text: text
                }

            }

            if (props.edit) {
                console.log('edit')
            } else {
                props.setNoteList([...props.noteList, timestampObject]);
                props.setTimestampInput(false)
            }
        } else {
            console.log('error')
        }
    }

    function handleDeleteTimestamp() {
        props.setTimestampInput(false)
    }
    return(
        <div>
            <div className="d-flex">
            <div className="mr-1" style={{ width: "6em"}}>
                <TextInputField field="Hour" type="number" placeholder="" ref={HourRef}
                error={error.hour} message={'Invalid'} />
            </div>
            <div className="mr-1" style={{ width: "6em"}}>
                <TextInputField field="Min" type="number" placeholder="" ref={MinRef}
            error={error.min}message={'Invalid'} />
            </div>
            <div style={{ width: "6em"}}>
                <TextInputField field="Sec" type="number" placeholder="" ref={SecRef}
            error={error.sec} message={'Invalid'}/>
            </div>
            </div>

            <NoteInputField ref={TimestampNote} error={noteError} setError={setNoteError}/>

        <div>
        <button type="button" className="btn submit-btn mr-1" disabled={noteError ? true : false} onClick={handleInsertTimestamp}>Save Timestamp</button>
        <button type="button" className="btn submit-btn-secondary" onClick={handleDeleteTimestamp}>Cancel</button></div>
        </div>
    )
}