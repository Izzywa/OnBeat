import React from "react";

export default function Paginator(props) {
    function PageItem(props) {
        const page = (props.page ? props.page : 1)
       /* const currentPage = (page === null ? 1 : page)
        return(
            <a className={currentPage == item ? "page-link current": "page-link"}>{item}</a>
        )*/
       return (
        <a className="page-link">{page}</a>
       )
    }
    let paginationList = Array(props.numPages).fill().map((_, index) => index + 1)

    /**
     * 
     *     {
        paginationList.map((item, key) => {
            return(
                <li className="page-item" key={key}>
                    <PageItem item={item} page={props.page}/>
                </li>
            )
        })
    }
     * <input list="browsers">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist> 
     */

    return(<>
    <nav aria-label="Page navigation example">
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