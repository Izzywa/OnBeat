import React from "react";
import TextInputField from "./TextInputField";

export default function Login(props) {
    return(
        <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="w-100">
            <form>
                <TextInputField field="Username" type="text" placeholder="Username"/>
                <TextInputField field="Password" type="password" placeholder="Password"/>
                <button className="btn btn-primary mx-1">Register</button>
                <button type="submit" className="btn btn-primary">Submit</button> 
            </form>
            </div>
        </div>
    )
}