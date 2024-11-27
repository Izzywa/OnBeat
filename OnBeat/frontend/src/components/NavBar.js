import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function NavBar(props) {
    const { logout, pageName } = useAuth();

    function handleLogout() {
        logout();
    }

    function DropdownItem(props) {
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
          <DropdownItem label="Search" link="/search"/>
        </div>
      </li>
        )
    }


    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <h4 id="nav-page-name">{pageName}</h4>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
          <Dropdown />
        </ul>
      </div>
    </nav>
    )
}