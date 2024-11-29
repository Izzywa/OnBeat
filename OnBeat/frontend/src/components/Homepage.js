import React, { useEffect, useState} from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import NoteCard from "./NoteCard";
import Paginator from "./Paginator";

export default function Homepage(props) {
    const { setPageName } = useAuth();
    const [lastNotes, setLastNotes] = useState({
        lastCreated: null,
        lastModified: null
    })

    useEffect(() => {
        setPageName('Homepage')

        fetch('/backend/homepage')
        .then(response => response.json())
        .then(result => {
            setLastNotes(result.lastNotes)
        }).catch(error => {
            console.log(error)
        })
    },[])

        const [bookmarks, setBookmarks] = useState([])
        const [page, setPage] = useState(null)
        const [numPages, setNumPages] = useState(null)

        
    useEffect(() => {
        const url = (page ? `/backend/bookmark/${page}`: '/backend/bookmark')
        let okStatus;
        fetch(url)
        .then(response => {
            okStatus = response.ok
            return response.json()}
        )
        .then(result => {
            if (okStatus){
                setBookmarks(result.bookmarks)
                setNumPages(result.numPages)
            } else {
                console.log(result)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [page])

    /**
     * { bookmarks.map((item,index) => {
                return (
                <div key={index}>
                    <NoteCard value={item} />
                    </div>
                )
            })}
     */

        console.log(bookmarks)
    
    return(
    <div>
        <NavBar/>
        <div className="container">
            <h3>Last Created</h3>
            { lastNotes.lastCreated ? <NoteCard value={lastNotes.lastCreated}/>
            : "no item"}
        </div>
        <div className="container">
            <h3>Last Modified</h3>
            { lastNotes.lastModified ? <NoteCard value={lastNotes.lastModified}/>
            : "no item"}
        </div>
        <div className="container">
            <h3>bookmarks</h3>
            {
                bookmarks.map((item, index) => {
                    return(
                        <div key={index}>
                            <p>{item.title}</p>
                            <NoteCard value={item} />
                        </div>
                    )
                })
            }

            { numPages ? <Paginator page={page} setPage={setPage} numPages={numPages}/> : null }
        </div>

    </div>
    )
}