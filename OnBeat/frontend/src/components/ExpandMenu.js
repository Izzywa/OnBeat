import React, {useEffect, useState, } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function ExpandMenu(props) {

    const [navClassName, setNavClassName] = useState("hide")

    function toggleOpen() {
        if (navClassName !== 'hide') {
            setNavClassName('hide')
        } else {
            setNavClassName('')
        }
    }

    function handle() {
        alert('clicked')
    }

    /*<span id="expand-1" style={props.NoteIconStyle}>
    <a><EditNoteIcon/></a>
    </span>*/

    return(
        <nav id="expand-menu" className={navClassName} style={props.ExpandMenuStyle}>
            <div className="add-content-menu">
                <div className="content-menu-toggle" onClick={toggleOpen}>
                    <a><AddCircleIcon /></a>
                </div>
                <span style={props.NoteIconStyle}>
                <a><EditNoteIcon/></a>
                </span>
                <span style={props.TimeIconStyle}>
                    <a><MoreTimeIcon/></a>
                </span>
                <span style={props.YouTubeIconStyle}>
                    <a><YouTubeIcon onClick={props.handleYoutubeBtnClicked}/></a>
                </span>
            </div>
        </nav>
    ) 
}