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
    let paginationList = Array(props.numPages).fill().map((_, index) => index + 1)

    /**
     * 
     * function DropdownItem(props) {
      if (props.link) {
        return (
          <Link className="dropdown-item" to={props.link}>{props.label}</Link>
        )
      } else {
        return (
            <a className="dropdown-item" href="#">{props.label}</a>
        )
      }
    }

    function Dropdown() {
        return (
            <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          More
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <DropdownItem label='Create Note' link="/create-note"/>
          <DropdownItem label="Notes List" link="/list"/>
          <div className="dropdown-divider"></div>
          <DropdownItem label="Search" />
        </div>
      </li>
        )
    }

     *     {
        paginationList.map((item, key) => {
            return(
                <li className="page-item" key={key}>
                    <PageItem item={item} page={props.page}/>
                </li>
            )
        })
    }
     */

    return(<>
    <nav aria-label="Page navigation">
  <ul className="pagination">
    <li className="page-item">
        <a className={props.page === null || props.page === 1 ? "page-link disabled" : "page-link"} >Previous</a>
        </li>

        <PageItem page={props.page} numPages={props.numPages} setPage={props.setPage}/>

    <li className="page-item">
        <a className={props.page == props.numPages ? "page-link disabled": "page-link"}>Next</a>
        </li>
  </ul>
</nav>
    </>)
}