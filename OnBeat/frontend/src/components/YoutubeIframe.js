import React, { useState, useEffect} from "react";
import YouTube from 'react-youtube';
import LoadingSpinner from "./LoadingSpinner";

export default function YoutubeIframe(props) {

    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 0
      },
    }

    const errorMessage = {
        2: 'Invalid Video Id.',
        5: 'Content cannot be played in HTML5 player.',
        100: 'Video not found.',
        101: 'Video not allowed to be played in embedded player.',
        150: 'Video not allowed to be played in embedded player.'
    }

    const [ready, setReady] = useState(false);

    const [error, setError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        if (!props.viewOnly) {
            if (!error.error && ready) {
                props.setInsertTimestamp(true)
                props.setYoutubeError(false)
            } else {
                props.setInsertTimestamp(false)
                props.setYoutubeError(true)
            }
        }
    }, [error, ready])

    const [show, setShow] = useState(false)

    function onReady(event) {
        event.target.pauseVideo();
        setShow(true)
        setReady(true);
    }


    function handleChangeVideo() {
        props.setVideoID(null)
        props.setInsertTimestamp(false)
    }

    function RenderAfterReady() {
       return (
        <button className="btn submit-btn" onClick={handleChangeVideo}>Change Video</button>
       )
    }

    function handleError(event){
        console.log('error in loading video')
        setError({
            error: true,
            message: errorMessage[event.data]
        })
    }

    function ErrorAlert(){
        return (
            <div className="alert alert-danger container" role="alert">
            {error.message}
            </div>
        )
    }


    return (
    <div className="my-2">
        {error.error ? <ErrorAlert/> : null}

        <LoadingSpinner hide={show}/>
        <div className={show ? "": "no-show"}>
        <YouTube className="ratio ratio-16x9"
         ref={props.IframeRef} videoId={props.id} 
         opts={opts} onReady={onReady} 
         onError={handleError}/>
         </div>

         { ready && !props.viewOnly ? <RenderAfterReady/>:null}
    </div>
    )
}
