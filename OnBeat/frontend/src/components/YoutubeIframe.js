import React, {useRef, useState, useEffect, forwardRef} from "react";
import YouTube from 'react-youtube';

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

    const [show, setShow] = useState(false)

    function onReady(event) {
        event.target.pauseVideo();
        setShow(true)
        setReady(true);
        props.setInsertTimestamp(true)
    }

    function handlePlay(event) {
       /* const interval = setInterval(() => {
            setCurrentTime(event.target.getCurrentTime())
        }, 100);

        return () => clearInterval(interval);*/
    }

    const [x, setX] = useState(null)
    function click() {
       // ref.current.internalPlayer.getDuration().then(response => setX(response))
    }

    const [t, setT] = useState(null);
    function time(){
       // ref.current.internalPlayer.getCurrentTime().then(response => setT(response))
    }

    function seek() {
       // ref.current.internalPlayer.seekTo(30);
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

    function LoadingSpinner() {
        //{show ? "spinner-div no-show": "spinner-div show"}
        return(
            <div className={ show ? "spinner-div no-show" : "spinner-div show-flex"}>
                <div className="d-inline">
                <span>Loading...</span>
                </div>
            <div className="spinner-grow" role="status">
            </div>
            </div>
        )
    }

    return (
    <div className="my-2">
        {error.error ? <ErrorAlert/> : null}

        <LoadingSpinner />

        <YouTube className="ratio ratio-16x9"
         ref={props.IframeRef} videoId={props.id} 
         opts={opts} onReady={onReady} 
         onError={handleError}
         onPlay={handlePlay}/>

         { ready ? <RenderAfterReady/>:null}
    </div>
    )
}
