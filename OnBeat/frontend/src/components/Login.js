import React, {useRef, useState} from "react";
import { Link } from 'react-router-dom';
import TextInputField from "./TextInputField";
import csrftoken from "./CSRFCookie";

export default function Login(props) {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const [message, setMessage] = useState({
        'error': false,
        'message': ''
    })

    function handleLoginSubmit(event) {
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
                password: passwordRef.current.value,
            })
           }
    
           fetch('backend/login', requestOptions)
           .then(response => {
            if (response.ok) {
                window.location.href = "/"
            } else {
                return response.json()
            }
           }).then(result => {
            setMessage(result)
           })
          
    }

    return(
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="title">
                LOGIN
            </div>
            <div className="w-100">
            <form onSubmit={handleLoginSubmit}>
                <TextInputField field="Username" type="text" placeholder="Username" ref={usernameRef}
                error={message.error} message={message.message}/>
                <TextInputField field="Password" type="password" placeholder="Password" ref={passwordRef} error={message.error}/>
                <button type="submit" className="btn btn-primary">Submit</button> 
                <Link to="/register" className="btn btn-primary mx-2">Register</Link>
            </form>
            </div>
        </div>
    )
}