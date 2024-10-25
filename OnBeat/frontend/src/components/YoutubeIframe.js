import React, {useRef, useState, useEffect, forwardRef} from "react";
import YouTube from 'react-youtube';

const YoutubeIframe = forwardRef(function YoutubeIframe(props, ref) {

   // const vidref = useRef();
    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 0
      },
    }

    const [ready, setReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0)

    function onReady(event) {
        event.target.pauseVideo();
        setReady(true);
    }

    function handlePlay(event) {
        const interval = setInterval(() => {
            setCurrentTime(event.target.getCurrentTime())
        }, 100);

        return () => clearInterval(interval);
    }

    const [x, setX] = useState(null)
    function click() {
        ref.current.internalPlayer.getDuration().then(response => setX(response))
    }

    const [t, setT] = useState(null);
    function time(){
        ref.current.internalPlayer.getCurrentTime().then(response => setT(response))
    }

    function seek() {
        ref.current.internalPlayer.seekTo(30);
    }

    function handleChangeVideo() {
        props.setVideoID(null)
    }

    function RenderAfterReady() {
      /*  return (
            <>
         <button className="btn btn-primary" onClick={click}>DURATION</button>
         <button className="btn btn-primary" onClick={time}>CURRENT TIME</button>
         <button className="btn btn-primary" onClick={seek}>SEEK TO 30s</button>
         <h4>{x}</h4>
         <h4>{new Date(t * 1000).toISOString().slice(11,19)}</h4>
            </>
        ) */
       return (
        <button className="btn submit-btn" onClick={handleChangeVideo}>Change Video</button>
       )
    }

    function handleError(){
        alert('error')
    }

    return (
    <div className="my-2">
        <YouTube className="ratio ratio-16x9"
         ref={ref} videoId={props.id} 
         opts={opts} onReady={onReady} 
         onError={handleError}
         onPlay={handlePlay}/>


         { ready ? <RenderAfterReady/>:null}
    </div>
    )
});

export default YoutubeIframe