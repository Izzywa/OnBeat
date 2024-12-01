import React, { useEffect, useState} from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import NoteCard from "./NoteCard";
import Paginator from "./Paginator";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Alert } from "@mui/material";

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

    
    return(
        <>
    <div>
        <NavBar/>
        <div className="container my-3">
            <h3 className="homepage-title">Last Created</h3>
            { lastNotes.lastCreated ? <NoteCard value={lastNotes.lastCreated}/>
            : <div className="alert-no-notes"><h6>No Notes</h6></div>
            }
        </div>
        <div className="container my-3">
            <h3 className="homepage-title">Last Modified</h3>
            { lastNotes.lastModified ? <NoteCard value={lastNotes.lastModified}/>
            :  <div className="alert-no-notes"><h6>No Notes</h6></div>
            }
        </div>
        <div className="container my-3">
            <h3 className="homepage-title"> <BookmarkIcon/>bookmarks</h3>
            {
                bookmarks.map((item, index) => {
                    return(
                        <div key={index}>
                            <NoteCard value={item} />
                        </div>
                    )
                })
            }

            { numPages ? <Paginator page={page} setPage={setPage} numPages={numPages}/> : null }
        </div>

    </div>
    <footer style={{height: "5em"}}></footer>
    </>
    )
}