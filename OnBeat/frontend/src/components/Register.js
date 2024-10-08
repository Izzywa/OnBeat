import React, {useRef, useState, useEffect} from "react";
import TextInputField from "./TextInputField";
import csrftoken from "./CSRFCookie";

export default function Register(props) {
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmationRef = useRef()

    const [fieldMessage, setFieldMessage] = useState({
        'username': {
            'error': false,
            'message': ''
        },
        'email': {
            'error': false,
            'message': ''
        },
        'password': {
            'error': false,
            'message': ''
        },
        'confirmation': {
            'error': false,
            'message': ''
        }
    })


    function handleRegisterSubmit(event) {
        event.preventDefault()

       const requestOptions = {
        method: ('POST'),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken()
        },
        mode: 'same-origin',
        body: JSON.stringify({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmation: confirmationRef.current.value
        })
       }

       fetch('backend/register', requestOptions)
       .then(response => response.json())
       .then(result => {
        setFieldMessage(result)
       })
    }

    return(
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="title">
                REGISTER
            </div>
            <div className="w-100">
            <form onSubmit={handleRegisterSubmit}>
                <TextInputField 
                field="Username" type="text" placeholder="Username must be unique" ref={usernameRef} 
                message={fieldMessage.username.message} error={fieldMessage.username.error}/>
                <TextInputField 
                field="Email" type="text" placeholder="Email" ref={emailRef} 
                message={fieldMessage.email.message} error={fieldMessage.email.error}/>
                <TextInputField 
                field="Password" type="password" placeholder="Password minimum 6 characters" ref={passwordRef} 
                message={fieldMessage.password.message} error={fieldMessage.password.error}/>
                <TextInputField 
                field="PasswordConfirmation" type="password" placeholder="Reenter password" ref={confirmationRef} 
                message={fieldMessage.confirmation.message} error={fieldMessage.confirmation.error}/>
                <button type="submit" className="btn btn-primary">Submit</button> 
            </form>
            </div>
        </div>
    )
}