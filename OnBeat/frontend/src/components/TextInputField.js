import React, {forwardRef} from "react";

const TextInputField =  forwardRef(function TextInputField(props, ref) {

  let id;
  if (props.field.split(' ').length == 1) {
    id = `${props.field}Input`
  } else {
    id = `${props.field.split(' ').join('-')}Input`
  }
    const describedby = `${props.field}Help`

    return (
    
        <div className="form-group">
        {props.field ? <label className="form-label" htmlFor={id}>{props.field}</label>: null }
        <input 
        autoFocus={props.autoFocus}
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