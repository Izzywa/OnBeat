import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import getVideoID from "./getVideoID";

export default function ListOfNotes(props) {
    const { setPageName } = useAuth()

    const [list, setList] = useState([])

    useEffect(() => {
        setPageName("Note List")

        fetch('/backend/list')
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setList(result.notes)
        })
    }, [])


    function NoteCard(props) {
        
        const card = useCallback(() => {
            switch(true) {
                case (props.value.youtubeURL != null):
                    return(
                        <div className="card my-2">
                            <div className="row">
                                <div className="col-sm-8 col-12">
                                    <div className="card-body">
                                    <h5 className="card-title">{props.value.title}</h5>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-12">
                                <img src={`https://img.youtube.com/vi/${getVideoID(props.value.youtubeURL)}/0.jpg`} className="img-fluid rounded" alt={props.value.title}/>
                                </div>
                            </div>
                        </div>

                    )
                default:
                    return(
                        <div className="card my-2">
                            <div className="card-body">
                                <h5 className="card-title">{props.value.title}</h5>
                            </div>
                        </div>
                    )
            }
        })
        return(
            <>
            {card()}
            </>
        )
    }

    return (<>
    <NavBar />
        <div className="container">
            <div>
            <h1>list of notes</h1>
            </div>
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
            
        </div>
        </>
    )
}