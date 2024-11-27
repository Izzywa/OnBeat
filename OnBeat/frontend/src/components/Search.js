import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import TextInputField from "./TextInputField";
import csrftoken from "./CSRFCookie";
import Paginator from "./Paginator";

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

        fetch('/backend/search', requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setNumPages(result.num_pages)
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
            <>
            <input className="form-check-input" type="checkbox" id={`${props.keyName}-checkbox`} 
            value={props.keyName} defaultChecked={props.filter[props.keyName]} onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor={`${props.keyName}-checkbox`}>
                {props.keyName}
            </label>
            </>
        )
    }


    return(
        <>
        <NavBar />
        <div className="container">
            <div>
            <TextInputField field="Search" type="text" placeholder="" ref={searchRef} onChange={handleSearchInputChange}/>
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
            <div>
                {numPages ? 
                <Paginator page={page} setPage={setPage} numPages={numPages} />
                 : <p>no pages</p> }
               
            </div>
        </div>
        </>
    )
}