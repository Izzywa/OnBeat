import React from "react";

export default function TextInputField(props) {
    const id = `Register${props.field}Input`
    const describedby = `${props.field}Help`

    return (
        <div className="form-group">
        <label htmlFor={id}>{props.field === "PasswordConfirmation" ? "Password Confirmation" : props.field}</label>
        <input type={props.type} className="form-control" id={id} aria-describedby={describedby} placeholder={props.placeholder}></input>
        <small id={describedby} className="form-text text-danger"></small>
    </div>
    )
}