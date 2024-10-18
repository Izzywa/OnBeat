import React, {useRef, useState} from "react";
import TextInputField from "./TextInputField";

export default function YoutubeLinkInput(props) {
    const videoUrl = useRef()
    const [videoID, setVideoID] = useState(null)
    const [UrlValidation, setUrlValidation] = useState({
        'error': false,
        'message': ''
    })

    function handleVideUrlSubmit(event) {
        event.preventDefault();
        const url = videoUrl.current.value
        let code;

        if (url.startsWith('https://www.youtube.com/watch?v=') || url.startsWith('https://youtu.be/')) {
            setUrlValidation({
                'error': false,
                'message': ''
            })
            
            if (url.startsWith('https://www.youtube.com')) {
                setVideoID(code = url.split('v=')[1].split('&')[0])
            } else {
                setVideoID(url.split('.be/')[1].split('?')[0])
            }

        } else {
            setUrlValidation({
                'error': true,
                'message': 'Invalid Youtube url.'
            })
        }
    }

    return (
        <>
         <form onSubmit={handleVideUrlSubmit}>
            <TextInputField field="Video Url" type="text" placeholder="Insert Youtube URL" ref={videoUrl} 
                message={UrlValidation.message} error={UrlValidation.error}/>
            <button type="submit" className="btn btn-primary">Video Url</button> 
        </form>

        <h1>VIDEO ID: {videoID}</h1>
        </>
    )
}