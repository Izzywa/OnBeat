import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";

export default function ListOfNotes(props) {
    const { setPageName } = useAuth()

    const [list, setList] = useState([])

    useEffect(() => {
        setPageName("View Note")

        fetch('/backend/list')
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setList(result.notes)
        })
    }, [])

    //https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg

    function NoteCard(props) {
        
        return(
            <div className="card">
        <img src="https://img.youtube.com/vi/bWIgy-Ls-SU/0.jpg" className="card-img-top" alt="..."/>
        <div className="card-body">
            <p className="card-text">{props.value.title}</p>
        </div>
        </div>
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