import React, { useCallback, useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import TextInputField from "./TextInputField";
import csrftoken from "./CSRFCookie";
import Paginator from "./Paginator";
import { Alert } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';

export default function Search(props) {
    const { setPageName } = useAuth();

    const searchRef = useRef()
    const [searchText, setSearchText] = useState('')
    const [filter, setFilter] = useState({
        title: true,
        note: true,
        timestamp: true
    })

    const [page, setPage] = useState(null)
    const [numPages, setNumPages] = useState(null)
    const [noteList, setNoteList] = useState([])
    const [error, setError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        setPageName("Search")
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: ('POST'),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken()
                },
                mode: 'same-origin',
                body: JSON.stringify({
                    text: searchText,
                    filter: filter,
                    page: page
                })
        }

        let status;
        fetch('/backend/search', requestOptions)
        .then(response => {
            status = response.status
            return response.json()
        })
        .then(result => {
            if (status === 200) {
                setNoteList(result.notes)
                setNumPages(result.num_pages)
                setError({
                    error: false,
                    message: ''
                })
            } else {
                setNoteList([])
                setNumPages(null)
                setError(result)
            }
        }).catch(error => {
            console.log(error)
        })

    }, [filter, searchText, page])


    function handleSearchInputChange() {
        setSearchText(searchRef.current.value)
        setPage(null)
    }


    function FilterCheckbox(props) {
        function handleCheckboxChange(event) {
            props.setFilter({
                ...props.filter,
                [event.target.value]: event.target.checked
            })
            props.setPage(null)
         }

        return (
            <div className="checkbox-container">
            <input type="checkbox" id={`${props.keyName}-checkbox`} 
            value={props.keyName} defaultChecked={props.filter[props.keyName]} onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor={`${props.keyName}-checkbox`}>
                {props.keyName}
            </label>
            </div>
        )
    }

    function SearchDisplay(props) {
        const type = useCallback(() => {
            switch(true) {
                case (props.item.title !== undefined):
                    return(
                        <h5 className="card-title title-display">{props.item.title}</h5>
                    )
                case (props.item.content !== undefined):
                    return(
                        <p>content</p>
                    )
                case (props.item.timestamp !== undefined):
                    return(
                        <p>timestamp</p>
                    )
                default:
                    return(
                        <></>
                    )
            }
        }, [])

        function handleGoToNote() {
            const id = (props.item.title !== undefined ? props.item.id : props.item.note_id)

             window.location.href = `/note/${id}`
        }

        return(<div className="card my-2">
            <div className="card-body">
                {type()}
                <a onClick={handleGoToNote} className="search-link">
                    <small>go to note <LaunchIcon sx={{ fontSize: 10 }}/></small>
                    </a>
            </div>
        </div>)
    }

    return(
        <>
        <NavBar />
        <div className="container">
            <div>
            <TextInputField field="Search" type="text" placeholder="" ref={searchRef} onChange={handleSearchInputChange}/>
            <div className="filter-container">
            <label htmlFor="filter-checkbox">Filters</label>
                <div className="filter-checkbox" id="filter-checkbox">
                    {
                        Object.keys(filter).map((item, index) => {
                            return (
                                <div key={index} className="form-check form-check-inline">
                            <FilterCheckbox keyName={item} setFilter={setFilter} filter={filter} setPage={setPage}/>
                            </div>
                            )
                        })
                    }
                </div>
                </div>
            </div>

            {
                error.error ?
                <Alert className="my-3" variant="outlined" severity="warning">{error.message}</Alert>
                : null
            }

            <div>
                {
                    noteList.map((item, index) => {
                        return(
                            <div key={index}>
                                <SearchDisplay item={item}/>
                            </div>
                        )
                    })
                }
            </div>
            <div className="my-2">
                {numPages ? 
                <Paginator page={page} setPage={setPage} numPages={numPages} />
                 : null }
               
            </div>
        </div>
        </>
    )
}