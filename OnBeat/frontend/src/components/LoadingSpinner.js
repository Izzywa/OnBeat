import React from "react";

export default     function LoadingSpinner(props) {
    return(
        <div className={ props.hide ? "spinner-div no-show" : "spinner-div show-flex"}>
            <div className="d-inline">
            <span>Loading...</span>
            </div>
        <div className="spinner-grow" role="status">
        </div>
        </div>
    )
}