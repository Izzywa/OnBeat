import React, {useRef, useState, useCallback} from "react";
import TextInputField from "./TextInputField";
import YoutubeIframe from "./YoutubeIframe";
import YouTube from "react-youtube";

export default function YoutubeLinkInput(props) {
    const videoUrl = useRef()
    const [videoID, setVideoID] = useState(null)
    const [UrlValidation, setUrlValidation] = useState({
        'error': false,
        'message': ''
    })
    const IframeRef = useRef();

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

    /*
    const [x, setX] = useState(null)
    function click() {
        console.log(IframeRef)
        IframeRef.current.internalPlayer.getDuration().then(response => setX(response))
        console.log(x)
    }

    const [t, setT] = useState(null);
    function getCurrentTime() {
        IframeRef.current.internalPlayer.getCurrentTime().then(response => setT(response))
    }

    function handleReady() {
        console.log(IframeRef.current)
    }

    function YoutubeIframeComponents() {
        return(
            <div>
                <YoutubeIframe id={videoID} ref={IframeRef}/>
                <button className="btn btn-success" onClick={click}>DURATION</button>
                <button className="btn btn-dark" onClick={getCurrentTime}>CURRENT TIME</button>
            </div>
        )
    }

*/

    return (
        <>
         <form onSubmit={handleVideUrlSubmit}>
            <TextInputField field="Youtube Video Url" type="text" placeholder="Insert Youtube URL" ref={videoUrl} 
                message={UrlValidation.message} error={UrlValidation.error}/>
            <button type="submit" className="btn btn-primary">Video Url</button> 
        </form>

        { videoID != null ? <YoutubeIframe id={videoID} ref={IframeRef}/> : null}
        </>
    )
}