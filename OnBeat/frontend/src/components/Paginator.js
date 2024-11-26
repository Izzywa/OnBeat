import React, { useState } from "react";

export default function Paginator(props) {
    function PageItem(props) {
        const page = (props.page ? props.page : 1)
        const [list, setList] = useState(Array(props.numPages).fill().map((_, index) => index + 1))

        function handleDropdownInputChange(event) {
            let templist = Array(props.numPages).fill().map((_, index) => index + 1).filter((item)=> {
                return item.toString().includes(event.target.value.toString())
            })
            setList(templist)
        }

        function DropdownItem({item, setPage}) {
            function handleDropdownItemClicked() {
                setPage(item)
            }
            return(
                <a className="dropdown-item" onClick={handleDropdownItemClicked}>{item}</a>
            )
        }

       return (
        <li className="dropdown paginator-dropdown">
        <a className="page-link dropdown-toggle px-3" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{page}</a>
            <ul className="dropdown-menu paginator-dropdown-menu">
        <li className="dropdown-input">
            <input type="number" min={1} step={1} onChange={handleDropdownInputChange}/>
        </li>
        {
            list.map((item, index) => {
                return(
                    <li key={index}>
                        <DropdownItem item={item} setPage={props.setPage}/>
                    </li>
                )
            })
        }
    </ul>

        </li>
       )
    }
    function handlePreviousBtnClicked() {
        const page = (props.page ? props.page : 1)
        console.log(page - 1)
        props.setPage(page - 1
        )
    }

    function handleNextBtnClicked() {
        const page = (props.page ? props.page : 1)
       console.log(page + 1)
       props.setPage(page + 1)
    }

    return(<>
    <nav aria-label="Page navigation">
  <ul className="pagination">
    <li className="page-item">
        <a className={props.page === null || props.page === 1 ? "page-link disabled" : "page-link"} 
        onClick={props.page === null || props.page === 1 ? null : handlePreviousBtnClicked}>Previous</a>
        </li>

        <PageItem page={props.page} numPages={props.numPages} setPage={props.setPage}/>

    <li className="page-item">
        <a className={props.page == props.numPages ? "page-link disabled": "page-link"}
        onClick={props.page == props.numPages ? null : handleNextBtnClicked}>Next</a>
        </li>
  </ul>
</nav>
    </>)
}