import React, {useRef, useState, useEffect, forwardRef} from "react";
import YouTube from 'react-youtube';

const YoutubeIframe = forwardRef(function YoutubeIframe(props, ref) {

   // const vidref = useRef();
    const opts = {
        height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      },
    }

    const [state, setState] = useState(-1)
    const [currentTime, setCurrentTime] = useState(0)

    function onReady(event) {
        event.target.pauseVideo();
      //  console.log(event.target)
       // console.log(event.target.getDuration())
    }

    function handlePause(event) {
        setState(YouTube.PlayerState.PAUSED)
    }

    function handlePlay(event) {
        setState(YouTube.PlayerState.PLAYING)
        const interval = setInterval(() => {
            setCurrentTime(event.target.getCurrentTime())
        }, 100);

        //Clearing the interval
        return () => clearInterval(interval);
    }

    function onPlayerStateChange(event) {
        console.log(event.data)
    }

   /* const [x, setX] = useState('');
    function click() {
        vidref.current.internalPlayer.getDuration().then(response => setX(response))
        //console.log(vidref.current.internalPlayer.getDuration())
    } */


    return (
    <div className="my-2">
         <YouTube 
         ref={ref}
         videoId={props.id} 
         title="YOUTUBE TITLE"
         opts={opts} 
         onReady={onReady} 
         onPause={handlePause} 
         onPlay={handlePlay}
         onStateChange={onPlayerStateChange}/>
         <h1>{currentTime}</h1>
    </div>
    )
});

export default YoutubeIframe