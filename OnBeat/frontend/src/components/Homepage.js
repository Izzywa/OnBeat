import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function Homepage(props) {
    const { logout } = useAuth();

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
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <DropdownItem label='Create Note' link="/create-note"/>
          <DropdownItem label="world" />
          <div className="dropdown-divider"></div>
          <DropdownItem label="other" />
        </div>
      </li>
        )
    }

    function popup() {
        alert('world clicked')
    }


    return(
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">USERNAME</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleLogout}>logout</a>
      </li>
      <Dropdown />
    </ul>
  </div>
</nav>
<div>
    Hello <span onClick={popup} className="pointer text-light bg-dark">world</span> !!!
</div>
    </div>
    )
}