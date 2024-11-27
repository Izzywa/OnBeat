import React, { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import TextInputField from "./TextInputField";

export default function Search(props) {
    const { setPageName } = useAuth();

    const searchRef = useRef()

    const [filter, setFilter] = useState([
        {
            type: "title",
            checked: true
        }, 
        {
            type: "note",
            checked: true
        }, 
        {
            type: "timestamp",
            checked: true
        }
        ])

    useEffect(() => {
        setPageName("Search")
    }, [])

    function handleSearchInputChange() {
        console.log(searchRef.current.value)
    }

    function FilterCheckbox(props) {

        function handleCheckboxChange(event) {
            const templist = props.filter
            templist[props.index] = {
                type: event.target.value,
                checked: event.target.checked
            }
            props.setFilter(templist)
        }

        return (
            <>
            <input className="form-check-input" type="checkbox" id={`${props.item.type}-checkbox`} 
            value={props.item.type} defaultChecked={true} onChange={handleCheckboxChange}/>
            <label className="form-check-label" htmlFor={`${props.item.type}-checkbox`}>
                {props.item.type}
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
                    filter.map((item, index)=> {
                        return(
                            <div key={index} className="form-check form-check-inline">
                            <FilterCheckbox item={item} setFilter={setFilter} filter={filter} index={index}/>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div>
                <p>search result</p>
            </div>
        </div>
        </>
    )
}