import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import TextInputField from "./TextInputField";
import csrftoken from "./CSRFCookie";
import { checkboxClasses } from "@mui/material";

export default function Search(props) {
    const { setPageName } = useAuth();

    const searchRef = useRef()
    const [searchText, setSearchText] = useState('')
    const [filter, setFilter] = useState({
        title: true,
        note: true,
        timestamp: true
    })

    useEffect(() => {
        setPageName("Search")
    }, [])

    useEffect(() => {
        console.log(searchText)
        console.log(filter)

    }, [filter, searchText])


    function handleSearchInputChange() {
        setSearchText(searchRef.current.value)
    }


    function FilterCheckbox(props) {
        function handleCheckboxChange(event) {
            props.setFilter({
                ...props.filter,
                [event.target.value]: event.target.checked
            })
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
                            <FilterCheckbox keyName={item} setFilter={setFilter} filter={filter}/>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <p> title ? {filter.title ? "true": "false"}</p>
            </div>
        </div>
        </>
    )
}