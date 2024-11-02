import React, {useRef, useEffect, useMemo} from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";


export default function NewTimestamp(props) {
    const SecRef = useRef();
    const MinRef = useRef();
    const HourRef = useRef();
    const TimestampNote = useRef()
    

    function handleInsertTimestamp() {
        console.log(SecRef.current.value)
    }
    return(
        <div>
            <div className="d-flex">
            <div className="mr-1" style={{ width: "3.7em"}}><TextInputField field="Hour" type="number" placeholder="" ref={HourRef}/></div>
            <div className="mr-1" style={{ width: "3.7em"}}><TextInputField field="Min" type="number" placeholder="" ref={MinRef}/></div>
            <div style={{ width: "3.7em"}}><TextInputField field="Sec" type="number" placeholder="" ref={SecRef}/></div>
            </div>

            <NoteInputField ref={TimestampNote} />

        <button type="button" className="btn submit-btn" onClick={handleInsertTimestamp}>Insert Timestamp</button>
        </div>
    )
}