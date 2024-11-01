import React, {useRef, useEffect} from "react";
import TextInputField from "./TextInputField";
import NoteInputField from "./NoteInputField";

export default function NewTimestamp(props) {
    const SecRef = useRef();
    const MinRef = useRef();
    const HourRef = useRef();
    
    useEffect(() => {
        SecRef.current.value = 10;
    })

    function handleInsertTimestamp(event) {
        event.preventDefault()
        console.log(SecRef.current.value)
    }
    return(
        <div>
            <form className="">
                <div className="d-flex g-2">
                <div className="mr-1" style={{ width: "3.7em"}}><TextInputField field="Hour" type="number" placeholder="" ref={HourRef}/></div>
                <div className="mr-1" style={{ width: "3.7em"}}><TextInputField field="Min" type="number" placeholder="" ref={MinRef}/></div>
                <div style={{ width: "3.7em"}}><TextInputField field="Sec" type="number" placeholder="" ref={SecRef}/></div>
                </div>
            <button type="submit" className="btn submit-btn" onClick={handleInsertTimestamp}>Insert Timestamp</button>
            </form>
        </div>
    )
}