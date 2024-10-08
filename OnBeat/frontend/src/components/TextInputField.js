import React, {forwardRef} from "react";

const TextInputField =  forwardRef(function TextInputField(props, ref) {
    const id = `Register${props.field}Input`
    const describedby = `${props.field}Help`

    return (
    
        <div className="form-group">
        <label className="form-label" htmlFor={id}>{props.field === "PasswordConfirmation" ? "Password Confirmation" : props.field}</label>
        <input 
        ref={ref}
        type={props.type} 
        className={props.error ? "form-control is-invalid": "form-control"}
        id={id} 
        aria-describedby={describedby} 
        placeholder={props.placeholder}></input>
        <div className="invalid-feedback">
        {props.error ? props.message: null}
      </div>
    </div>
    )
});
export default TextInputField