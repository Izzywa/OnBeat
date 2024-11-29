import React, {useCallback} from "react";
import getVideoID from "./getVideoID";

export default function NoteCard(props) {
        
    const card = useCallback(() => {
        switch(true) {
            case (props.value.youtubeURL != null):
                return(
                    <div className="row">
                        <div className="col-sm-8 col-12">
                            <div className="card-body">
                            <h5 className="card-title title-display">{props.value.title}</h5>
                            <p className="card-text"><small className="text-secondary">{props.value.date_created}</small></p>
                            </div>
                        </div>
                        <div className="col-sm-4 col-12">
                        <img src={`https://img.youtube.com/vi/${getVideoID(props.value.youtubeURL)}/0.jpg`} className="img-fluid rounded" alt={props.value.title}/>
                        </div>
                    </div>
                )
            default:
                return(
                    <div className="card-body">
                        <h5 className="card-title title-display">{props.value.title}</h5>
                        <p className="card-text"><small className="text-secondary">{props.value.date_created}</small></p>
                    </div>
                )
        }
    },[])
    function handleNoteCardClicked() {
        window.location.href = `/note/${props.value.id}`
    }

    return(
        <>
        <div className="card my-2" onClick={handleNoteCardClicked}>
            {card()}
        </div>
        </>
    )
}
