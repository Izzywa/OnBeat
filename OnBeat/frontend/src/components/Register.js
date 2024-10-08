import React from "react";
import TextInputField from "./TextInputField";

export default function Register(props) {

    return(
        <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="w-100">
            <form>
                <TextInputField field="Username" type="text" placeholder="Username must be unique"/>
                <TextInputField field="Email" type="email" placeholder="Email"/>
                <TextInputField field="Password" type="password" placeholder="Password minimum 6 characters"/>
                <TextInputField field="PasswordConfirmation" type="password" placeholder="Reenter password"/>
                <button type="submit" className="btn btn-primary">Submit</button> 
            </form>
            </div>
        </div>
    )
}