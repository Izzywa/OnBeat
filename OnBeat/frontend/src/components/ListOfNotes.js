import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import getVideoID from "./getVideoID";
import Paginator from "./Paginator";

export default function ListOfNotes(props) {
    const { setPageName } = useAuth()
    const [page, setPage] = useState(null)
    const [numPages, setNumPages] = useState(null)

    const [list, setList] = useState([])


    useEffect(() => {
        setPageName("Notes List")

        let url = (page ? `/backend/list/${page}`: 'backend/list')
        let okStatus;
        
        fetch(url)
        .then(response => {
            okStatus = response.ok
            return response.json()
        })
        .then(result => {
            if (okStatus) {
                setList(result.notes)
                setNumPages(result.num_pages)
            }
            else {
                console.log(result)
            }
        }).catch(error => {console.log(error)})
    }, [])


    function NoteCard(props) {
        
        const card = useCallback(() => {
            switch(true) {
                case (props.value.youtubeURL != null):
                    return(
                        <div className="row">
                            <div className="col-sm-8 col-12">
                                <div className="card-body">
                                <h5 className="card-title">{props.value.title}</h5>
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
                            <h5 className="card-title">{props.value.title}</h5>
                            <p className="card-text"><small className="text-secondary">{props.value.date_created}</small></p>
                        </div>
                    )
            }
        })
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

    return (<>
    <NavBar />
        <div className="container">
            <div>
                {
                    list.map((value, index) => {
                        return(
                            <div key={index}>
                                <NoteCard value={value} />
                            </div>
                        )
                    })
                }
            </div>

            { numPages ? <Paginator page={page} setPage={setPage} numPages={numPages}/>: null}
            
        </div>
        </>
    )
}