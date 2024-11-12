import React, {useRef, useState, useCallback} from "react";
import TextInputField from "./TextInputField";
import YoutubeIframe from "./YoutubeIframe";

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

    function VideoUrlInput() {
        return (
            <form onSubmit={handleVideUrlSubmit}>
            <TextInputField field="Youtube Video Url" type="text" placeholder="Insert Youtube URL" ref={videoUrl} 
                message={UrlValidation.message} error={UrlValidation.error}/>
            <button type="submit" className="btn submit-btn">Submit Url</button> 
        </form>
        )
    }

    return (
        <>

        { videoID != null ? <YoutubeIframe id={videoID} IframeRef={props.IframeRef} setVideoID={setVideoID} setInsertTimestamp={props.setInsertTimestamp}/> : <VideoUrlInput/>}
        </>
    )
}