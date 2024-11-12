import React, {useRef, useEffect, useState} from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";


export default function NewTimestamp(props) {
    const SecRef = useRef();
    const MinRef = useRef();
    const HourRef = useRef();

    const TimestampNote = useRef()
    const Vid = props.IframeRef.current.internalPlayer
    let [duration, setDuration] = useState(null);

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

    function validateTimestamp(event, time) { 
    }


    function handleInsertTimestamp() {
        const hour = parseFloat(HourRef.current.value);
        const min = parseFloat(MinRef.current.value);
        const sec = parseFloat(SecRef.current.value);

        console.log(hour)
        console.log(min)
    }
    return(
        <div>
            <div className="d-flex">
            <div className="mr-1" style={{ width: "3.7em"}}>
                <TextInputField field="Hour" type="number" placeholder="" ref={HourRef}
                error={error.hour} message={'Invalid'} onChange={(e) => {validateTimestamp(e, 'hour')}}/>
            </div>
            <div className="mr-1" style={{ width: "3.7em"}}><TextInputField field="Min" type="number" placeholder="" ref={MinRef}
            error={error.min}message={'Invalid'} onChange={(e) => {validateTimestamp(e, 'min')}}/>
            </div>
            <div style={{ width: "3.7em"}}><TextInputField field="Sec" type="number" placeholder="" ref={SecRef}
            error={error.sec} message={'Invalid'} onChange={(e) => {validateTimestamp(e, 'sec')}}/>
            </div>
            </div>

            <NoteInputField ref={TimestampNote} />

        <button type="button" className="btn submit-btn" onClick={handleInsertTimestamp}>Insert Timestamp</button>
        </div>
    )
}