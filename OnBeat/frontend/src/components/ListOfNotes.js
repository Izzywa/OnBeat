import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import NavBar from "./NavBar";
import NoteCard from "./NoteCard";
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
    }, [page])


    
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